import { environment } from 'src/environments/environment';
import { SupplierService } from './../../../../service/partner/supplier.service';
import { PackageService } from './../../../../service/package/package.service';
import { ProductService } from './../../../../service/product/product.service';
import { UnitService } from './../../../../service/unit/unit.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cou-product',
  templateUrl: './cou-product.component.html',
  styleUrls: ['./cou-product.component.scss']
})
export class CouProductComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;
  units = [];
  groupProds = [];
  typePacks = [];
  suppliers = [];
  API_IMG = '';
  images = [];
  price = 0;
  cost =0;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private unitSV: UnitService,
    private productSV: ProductService,
    private packageSV: PackageService,
    private supplierSV: SupplierService
  ) { }

  ngOnInit() {
    this.API_IMG = environment.APICURRENTSERVE;
    this.price = this.dataEdit.id ? this.dataEdit.price : 0;
    this.cost = this.dataEdit.id ? this.dataEdit.cost : 0;
    this.validateForm = this.fb.group({
      name: [this.dataEdit.id ? this.dataEdit.name : null, [Validators.required]],
      code: [this.dataEdit.id ? this.dataEdit.code : null, [Validators.required]],
      is_batch: [this.dataEdit.id ? this.dataEdit.is_batch : false],
      unit_id: [this.dataEdit.id ? this.dataEdit.unit_id+'' : null],
      group_id: [this.dataEdit.id ? this.dataEdit.group_id+'' : null],
      specification_id: [this.dataEdit.id ? this.dataEdit.specification_id+'' : '0'],
      supplier_id: [this.dataEdit.id ? this.dataEdit.supplier_id+'' : 0],
      price: [this.dataEdit.id ? this.dataEdit.price : 0],
      cost: [this.dataEdit.id ? this.dataEdit.cost : 0],
      note: [this.dataEdit.id ? this.dataEdit.note : ''],
      active: [this.dataEdit.id ? this.dataEdit.active : true]
    });

    this.loadInitData();

  }

  loadInitData() {
    this.unitSV.getAll().subscribe(r => { if (r && r.status == 1) this.units = r.data; });
    this.productSV.getGroupProd().subscribe(r => { if (r && r.status == 1) this.groupProds = r.data; });
    this.packageSV.getAllTypePack().subscribe(r => { if (r && r.status == 1) this.typePacks = r.data; });
    this.supplierSV.getAll().subscribe(r => { if (r && r.status == 1) this.suppliers = r.data; });
    if (this.dataEdit.id) {
      this.productSV.getImageProduct(this.dataEdit.id).subscribe(r => {
        if (r && r.status == 1) {
          r.data.forEach(function (e, i) {
            e.url = environment.APICURRENTSERVE + '/' + e.url;
            e.uid = e.id;
            e.name = 'Hình ảnh ' + (i + 1);
          });
          this.images = r.data;
        }
      })
    }
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

    let images = [];
    this.images.forEach(e => {
      if (e.id) images.push((e.url.replace(environment.APICURRENTSERVE + '/', '')))
      if ((e.response && e.response.status == 1)) images.push(e.response.urlImage);
    })

    if (this.validateForm.status === 'VALID') {
      let sup = { ...this.dataEdit, ...this.validateForm.value };
      sup.images = images;
      sup.price = Number(sup.price.replace(/,/g, ''));
      sup.price = Number(sup.cost.replace(/,/g, ''));

      this.productSV.updateOrCreateProduct(sup).subscribe(r => {
        if (r && r.status == 1) {
          this.message.create('success', this.dataEdit && this.dataEdit.id ? 'Cập nhật thành công!' : 'Tạo khách hàng thành công!');
          this.handleCancel();
        } else {
          this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại!');
        }
      });

    }
  }
}

