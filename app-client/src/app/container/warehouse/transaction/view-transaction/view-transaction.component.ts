import { WarehouseService } from './../../../../service/warehouse/warehouse.service';
import { environment } from 'src/environments/environment';
import { SupplierService } from './../../../../service/partner/supplier.service';
import { ProductService } from './../../../../service/product/product.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss']
})
export class ViewTransactionComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;
  units = [];
  isVisibleBatch = false;
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
  batch = {};
  timeId = null;
  inputSearchProd = '';
  isVisibleProduct = false;
  calProd = {
    totalPrice: 0,
    totalQuantity: 0,
    total: 0
  }

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private productSV: ProductService,
    private supplierSV: SupplierService,
    private warehouseSV: WarehouseService
  ) { }

  ngOnInit() {

    let source_id = this.dataEdit.id ? this.dataEdit.source_id : (this.dataEdit.transaction_type_id == 1 ? 0 : null);
    let dest_id = this.dataEdit.id ? this.dataEdit.dest_id : (this.dataEdit.transaction_type_id == 0 ? 0 : null);
    this.validateForm = this.fb.group({
      transaction_type_id: [this.dataEdit.transaction_type_id + '', [Validators.required]],
      source_id: [source_id + '', [Validators.required]],
      dest_id: [dest_id + '', [Validators.required]],
      supplier_id: [this.dataEdit.id ? this.dataEdit.supplier_id + '' : null, [Validators.required]],
      product_id: [null],
      note: ['']
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
      this.warehouseSV.getTransactionDetail({ transaction_id: this.dataEdit.id }).subscribe(r => {
        if (r && r.status == 1) {
          this.listProduct = r.data;
          this.handelCaculateProd();
        }
      });
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

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit(this.isVisible);
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

      let checkNotBatch = prod.find(r => { return r.is_batch && (!r.product_batch_id || r.product_batch_id == '') && (!r.batch_code || r.batch_code == '') });
      if (checkNotBatch) {

        this.message.create('error', 'Chọn lô cho hàng hóa ' + checkNotBatch.product_name + '!');
        return;
      }

      let checkQuantity = prod.find(r => { return (!r.quantity_request || r.quantity_request == '') || (r.quantity_request && r.quantity_request <= 0) })
      if (checkQuantity) {
        this.message.create('error', 'Số lượng sản phẩm ' + checkQuantity.product_name + ' không hợp lệ!');
        return;
      }

      this.warehouseSV.createTransaction(tran).subscribe(r => {
        if (r && r.status == 1) {
          this.message.create('success', this.dataEdit && this.dataEdit.id ? 'Cập nhật thành công!' : 'Tạo thành công!');
          this.handleCancel();
        } else {
          this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại!');
        }
      });
    }
  }

  handelChangeProd(val) {
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
            quantity_request: 1,
            price: prod.price,
            product_name: prod.name,
            product_code: prod.code,
            unit_name: prod.unit_name,
            specification_name: prod.specification_name,
            totaPrice: 0
          }
          this.listProduct.unshift(product);
          this.handelCaculateProd();
          if (prod.is_batch) {
            this.getBatch(prod.id);
          }
        }
      }
    }
    this.inputSearchProd = '';
  }

  getBatch(prdId) {
    this.productSV.getBatchByProd({ product_id: prdId }).subscribe(r => { if (r && r.status == 1) this.batchs = r.data; })
  }

  deleteProd(idProd) {
    let index = this.listProduct.findIndex(r => { return r.id == idProd });
    if (index >= 0 && this.listProduct.length > 1) {
      this.listProduct.splice(index, 1);
    }
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
    if (value != '' && this.validateForm.value.supplier_id) {
      let ft = {
        find: value,
        supplier_id: this.dataEdit.supplier_id,
        group_id: 0,
        active: 1,
        offset: 0,
        limit: 10
      }
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.getProducts(ft);
      }, 500);
    } else {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  handelCaculateProd() {
    this.calProd = {
      totalPrice: 0,
      totalQuantity: 0,
      total: 0
    }
    this.listProduct.forEach(prod => {
      let price = (prod.price && prod.price != '') ? Number((prod.price + '').replace(/,/g, '')) : 0;
      let quantity = (prod.quantity_request && prod.quantity_request != '') ? Number((prod.quantity_request + '').replace(/,/g, '')) : 0;

      prod.totalPrice = price * quantity;

      this.calProd.totalPrice = this.calProd.totalPrice + price;
      this.calProd.totalQuantity = this.calProd.totalQuantity + quantity;
      this.calProd.total = this.calProd.total + (price * quantity);
    });
  }
}

