import { PackageService } from './../../../../../service/package/package.service';
import { UnitService } from './../../../../../service/unit/unit.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cou-type-pack',
  templateUrl: './cou-type-pack.component.html',
  styleUrls: ['./cou-type-pack.component.scss']
})
export class CouTypePackComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private packageSV: PackageService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [this.dataEdit.id ? this.dataEdit.name : null, [Validators.required]],
      value_one_pie: [this.dataEdit.id ? this.dataEdit.value_one_pie : null],
      value_per_cartone: [this.dataEdit.id ? this.dataEdit.value_per_cartone : null],
      note:[this.dataEdit.id ? this.dataEdit.note : null],
      active: [this.dataEdit.id ? this.dataEdit.avtive : true]  
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
      let sup = { ...this.dataEdit, ...this.validateForm.value };
      this.packageSV.updateOrCreateTypePack(sup).subscribe(r => {
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
