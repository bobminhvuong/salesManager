import { ProductService } from './../../../../service/product/product.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-cou-batch',
  templateUrl: './cou-batch.component.html',
  styleUrls: ['./cou-batch.component.scss']
})
export class CouBatchComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  @Output() batchWasAdded = new EventEmitter();
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private productSV: ProductService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      batch_code: [this.dataEdit.id ? this.dataEdit.batch_code : ''],
      mfg_date: [this.dataEdit.id ? this.dataEdit.mfg_date : new Date(), [Validators.required]],
    });
  }

  handleCancel(data) {
    this.isVisible = false;
    this.closeModal.emit(this.isVisible);
    this.batchWasAdded.emit(data);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.status === 'VALID') {
      let sup = { ...this.dataEdit, ...this.validateForm.value };
      sup.mfg_date = moment(sup.mfg_date).format('DD/MM/YYYY');
      this.productSV.updateOrCreateBatch(sup).subscribe(r => {
        if (r && r.status == 1) {
          this.message.create('success', this.dataEdit && this.dataEdit.id ? 'Cập nhật thành công!' : 'Tạo lô thành công!');
          this.handleCancel({ id: r.id, product_id: this.dataEdit.product_id });
        } else {
          this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại!');
        }
      });

    }
  }

}
