import { ProductService } from './../../../../../service/product/product.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cou-group-product',
  templateUrl: './cou-group-product.component.html',
  styleUrls: ['./cou-group-product.component.scss']
})
export class CouGroupProductComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;
  productGroups = [];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private productSV: ProductService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [this.dataEdit.id ? this.dataEdit.name : null, [Validators.required]],
      parent_id: [this.dataEdit.id ? this.dataEdit.parent_id : 0 ],
      active: [this.dataEdit.id ? this.dataEdit.name : true]
    });
    this.getAllGroup();
  }

  getAllGroup() {
    this.productSV.getGroupProd().subscribe(r => {
      if (r && r.status == 1) {
        this.productGroups = r.data;
      }
    })
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
      let grp = { ...this.dataEdit, ...this.validateForm.value };
      console.log(123,grp);
      
      this.productSV.updateOrCreateGroupProd(grp).subscribe(r => {
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
