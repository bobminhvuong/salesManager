import { StoreService } from './../../../../service/store/store.service';
import { WarehouseService } from './../../../../service/warehouse/warehouse.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-report-batch-product',
  templateUrl: './report-batch-product.component.html',
  styleUrls: ['./report-batch-product.component.scss']
})
export class ReportBatchProductComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;
  stores = [];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private whSV: WarehouseService,
    private storeSV: StoreService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [this.dataEdit.id ? this.dataEdit.name : null, [Validators.required]],
      store_id: [this.dataEdit.id ? this.dataEdit.store_id + '' : null, [Validators.required]],
      active: [this.dataEdit.id ? this.dataEdit.active + '' : true]
    });
    this.storeSV.getAllStore().subscribe(r=>{ this.stores =r.data });
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
      this.whSV.updateOrCreateWH(sup).subscribe(r => {
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
