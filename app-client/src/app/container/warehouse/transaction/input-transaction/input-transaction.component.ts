import { WarehouseService } from './../../../../service/warehouse/warehouse.service';
import { environment } from 'src/environments/environment';
import { SupplierService } from './../../../../service/partner/supplier.service';
import { ProductService } from './../../../../service/product/product.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-input-transaction',
  templateUrl: './input-transaction.component.html',
  styleUrls: ['./input-transaction.component.scss']
})
export class InputTransactionComponent implements OnInit {

  validateForm: FormGroup;
  units = [];
  isVisibleBatch = false;
  isVisibleProduct = false;
  groupProds = [];
  typePacks = [];
  suppliers = [];
  warehouses = [];
  products = [];
  listProduct = [];
  API_IMG = '';
  images = [];
  price = 0;
  cost = 0;
  transaction_type = 0;
  batchs = [];
  checkNotBatch = [];
  checkQuantity=[];
  checkSuppliers=[];
  batch = {};
  timeId = null;
  dataEdit: any = {
    transaction_type_id: 1
  };
  inputSearchProd = '';

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private productSV: ProductService,
    private supplierSV: SupplierService,
    private warehouseSV: WarehouseService
  ) { }

  ngOnInit() {
    let dest_id = this.dataEdit.id ? this.dataEdit.dest_id + '' : null;
    this.validateForm = this.fb.group({
      transaction_type_id: ['1'],
      source_id: [0, [Validators.required]],
      dest_id: [dest_id, [Validators.required]],
      supplier_id: [this.dataEdit.id ? this.dataEdit.supplier_id + '' : null, [Validators.required]],
      product_id: [null],
      note: [null]
    });

    this.loadInitData();
  }

  getTitle() {
    if (this.dataEdit.id) {
      if (this.dataEdit.transaction_type_id == 1) {
        return 'Cập nhật phiếu nhập kho';
      }
      if (this.dataEdit.transaction_type_id == 2) {
        return 'Cập nhật phiếu xuất kho';
      }
      if (this.dataEdit.transaction_type_id == 3) {
        return 'Cập nhật phiếu chuyển kho';
      }
    } else {
      return this.dataEdit.transaction_type_id == 1 ? 'Tạo phiếu nhập kho' : 'Tạo phiếu xuất / chuyển kho'
    }
  }

  handelChangeTransaction(e) {
    this.transaction_type = e;
  }

  loadInitData() {
    this.productSV.getGroupProd().subscribe(r => { if (r && r.status == 1) this.groupProds = r.data; });
    this.supplierSV.getAll().subscribe(r => { if (r && r.status == 1) this.suppliers = r.data; });
    this.warehouseSV.getAllWH().subscribe(r => { if (r && r.status == 1) this.warehouses = r.data; });
    if (this.dataEdit.id) {
      this.warehouseSV.getTransactionDetail({ transaction_id: this.dataEdit.id }).subscribe(r => { if (r && r.status == 1) this.listProduct = r.data; });
    }
  }

  getProducts(ft) {
    this.productSV.getAllProduct(ft).subscribe(r => {
      if (r && r.status == 1) {
        this.products = r.data;

        if (this.products.length == 0) {
          this.products.push({ id: 0, name: 'Không tìm thấy sản phẩm!' })
        }
      }

    });
  }

  checkValidProd(id,type){
    if(type =='BATCH'){
      let hasError = this.checkNotBatch.find(r=>{
        return r.product_id == id;
      });
      return hasError ? true : false;
    }

    if(type == 'QUANTITY'){
      let hasError = this.checkQuantity.find(r=>{
        return r.product_id == id;
      });
      return hasError ? true : false;
    }

    if(type == 'SUPPLIER'){
      let hasError = this.checkSuppliers.find(r=>{
        return r.product_id == id;
      });
      return hasError ? true : false;
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.status === 'VALID') {
      let tran = { ...this.dataEdit, ...this.validateForm.value };
      let prod = this.listProduct;
      prod.forEach(r => {
        r.price = Number((r.price + '').replace(/,/g, ''));
      })
      tran.data = prod;
      tran.store_id = 0;
      delete tran.product_id;
      if (tran.transaction_type_id == 3 && tran.source_id == tran.dest_id) {
        this.message.create('error', 'Kho nhập và kho xuất phải khác nhau!');
        return;
      }
      if (prod.length == 0) {
        this.message.create('error', 'Bạn chưa chọn sản phẩm!');
        return;
      }

      this.checkSuppliers = prod.filter(r => { return r.supplier_id != tran.supplier_id });
      if (this.checkSuppliers.length > 0) {
        this.message.create('error', 'Nhà cung cấp sản phẩm không hợp lệ!');
        return;
      }

      this.checkNotBatch = prod.filter(r => { return r.is_batch && (!r.product_batch_id || r.product_batch_id == '') });
      if (this.checkNotBatch.length > 0) {
        this.message.create('error', 'Chọn lô cho hàng hóa!');
        return;
      }

      this.checkQuantity = prod.filter(r => { return (!r.quantity_request || r.quantity_request == '') || (r.quantity_request && r.quantity_request <= 0) })
      if (this.checkQuantity.length > 0) {
        this.message.create('error', 'Số lượng sản phẩm không hợp lệ!');
        return;
      }

      this.warehouseSV.createTransaction(tran).subscribe(r => {
        if (r && r.status == 1) {
          this.message.create('success', this.dataEdit && this.dataEdit.id ? 'Cập nhật thành công!' : 'Tạo thành công!');
          this.refresh();
        } else {
          this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại!');
        }
      });
    }
  }

  getBatch(prdId) {
    this.productSV.getBatchByProd({ product_id: prdId }).subscribe(r => { if (r && r.status == 1) this.batchs = r.data; })
  }

  formatDate(date, format) {
    return date ? moment(date).format(format) : '';
  }

  addBatch(prodId) {
    this.batch = {
      product_id: prodId
    }
    this.isVisibleBatch = true;
  }

  closeModalBatch(val) {
    setTimeout(() => {
      this.isVisibleBatch = false;
    }, 500);
  }

  onResponseBatch(val) {
    this.getBatch(val.product_id);
    if (val.id) {
      let index = this.listProduct.findIndex(r => { return r.product_id == val.product_id });
      if (index >= 0) {
        this.listProduct[index].product_batch_id = val.id + '';
      }
    }
  }

  onSearchProduct(value) {
    if (value != '') {
      let ft = {
        find: value,
        supplier_id: this.validateForm.value.supplier_id ? this.validateForm.value.supplier_id : 0,
        group_id: 0,
        active: 1,
        offset: 0,
        limit: 10
      }
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.getProducts(ft);
      }, 500);
    }
  }


  chooseProd(val) {
    if (val > 0) {
      let prod = this.products.find(r => { return r.id == val; });
      let checkHasProd = this.listProduct.find(r => { return r.id == val });
      if (checkHasProd) {
        this.message.create('error', 'Bạn đã chọn hàng hóa này!');
      } else {
        if (prod) {
          let product = {
            is_batch: prod.is_batch,
            product_id: prod.id,
            quantity_request: 0,
            price: prod.price,
            product_name: prod.name,
            product_code: prod.code,
            unit_name: prod.unit_name,
            specification_name: prod.specification_name,
            supplier_id: prod.supplier_id,
            supplier_name: prod.supplier_name
          }
          this.listProduct.unshift(product);
          if (prod.is_batch) {
            this.getBatch(prod.id);
          }
        }
      }
    }
    this.inputSearchProd = '';
  }

  checkSupplier() {
    return this.validateForm.value.supplier_id ? true : false;
  }

  refresh() {
    this.validateForm.reset();

    let dest_id = this.dataEdit.id ? this.dataEdit.dest_id + '' : null;
    this.validateForm = this.fb.group({
      transaction_type_id: ['1'],
      source_id: [0, [Validators.required]],
      dest_id: [dest_id, [Validators.required]],
      supplier_id: [this.dataEdit.id ? this.dataEdit.supplier_id + '' : null, [Validators.required]],
      product_id: [null],
      note: ['']
    });
    this.listProduct = [];
    this.products = [];
  }

  closeModalProduct(val) {
    setTimeout(() => {
      this.isVisibleProduct = false;
    }, 500);
  }
}

