import { WarehouseService } from './../../../../service/warehouse/warehouse.service';
import { environment } from 'src/environments/environment';
import { SupplierService } from './../../../../service/partner/supplier.service';
import { ProductService } from './../../../../service/product/product.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-wh',
  templateUrl: './input-wh.component.html',
  styleUrls: ['./input-wh.component.scss']
})
export class InputWHComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;
  units = [];
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
      source_id: [source_id, [Validators.required]],
      dest_id: [dest_id, [Validators.required]],
      suplier_id: [this.dataEdit.id ? this.dataEdit.transaction_type_id : null, [Validators.required]],
      product_id: [null]
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
    // if(this.dataEdit.id){
    //   this.warehouseSV.getTransactionDetail({transaction_id: this.dataEdit.id}).subscribe(r => { if (r && r.status == 1) this.warehouses = r.data; });
    // }
  }

  getProducts(supplier_id) {
    let filterProd = {
      find: '',
      supplier_id: supplier_id,
      group_id: 0,
      active: 1,
      offset: 0,
      limit: 10000000
    }
    this.productSV.getAllProduct(filterProd).subscribe(r => { if (r && r.status == 1) this.products = r.data; });
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
      if(tran.transaction_type_id ==3 && tran.source_id == tran.dest_id){
        this.message.create('error', 'Kho nhập và kho xuất phải khác nhau!');
        return;
      }
      if(prod.length  == 0){
        this.message.create('error', 'Bạn chưa chọn sản phẩm!');
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
    let prod = this.products.find(r => { return r.id == val; });
    let checkHasProd = this.listProduct.find(r => { return r.id == val });
    if (checkHasProd) {
      this.message.create('error', 'Bạn đã chọn hàng hóa này!');
    } else {
      if (prod) {
        let product = {
          id: prod.id,
          quantity: 1,
          price: prod.price,
          name: prod.name,
          code: prod.code
        }
        this.listProduct.unshift(product);
      }
    }
  }

  deleteProd(idProd) {
    let index = this.listProduct.findIndex(r => { return r.id == idProd });
    if (index >= 0 && this.listProduct.length > 1) {
      this.listProduct.splice(index, 1);
    }
  }
}

