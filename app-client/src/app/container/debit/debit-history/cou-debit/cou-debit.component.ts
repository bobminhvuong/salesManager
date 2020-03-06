import { DebitService } from './../../../../service/debit/debit.service';
import { SupplierService } from './../../../../service/partner/supplier.service';
import { CashbookService } from './../../../../service/cashbook/cashbook.service';
import { StoreService } from './../../../../service/store/store.service';
import { CustomerService } from './../../../../service/customer/customer.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-cou-debit',
  templateUrl: './cou-debit.component.html',
  styleUrls: ['./cou-debit.component.scss']
})
export class CouDebitComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  validateForm: FormGroup;
  dateFormat = 'YYYY/MM/DD';
  suppliers = [];
  cashbooks = [];
  stores = [];
  price = null;
  constructor(
    private storeSV: StoreService,
    private cashbookSV: CashbookService,
    private supplierSV: SupplierService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private debitSV: DebitService) { }

  ngOnInit() {
    let data = this.dataEdit;
    this.price = data.price;
    this.validateForm = this.fb.group({
      store_id: [data && data.id ? data.store_id + '' : null, [Validators.required]],
      supplier_id: [data && data.id ? data.supplier_id + '' : null, [Validators.required]],
      cashbook_source_id: [data && data.id ? data.cashbook_source_id + '' : null, [Validators.required]],
      date: [data && data.id ? new Date(data.date) : null, [Validators.required]],
      price: [data && data.id ? data.price : null, [Validators.required]],
      note: [data && data.id ? data.note : null],
    });
    this.storeSV.getAllStore().subscribe(r => { if (r && r.status == 1) this.stores = r.data; })
    this.cashbookSV.getCashbookSource().subscribe(r => { if (r && r.status == 1) this.cashbooks = r.data; })
    this.supplierSV.getAll().subscribe(r => { if (r && r.status == 1) this.suppliers = r.data; })
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
    if (this.validateForm.valid) {
      let data = this.validateForm.value;
      data = { ...this.dataEdit, ...data };
      data.date = moment(data.date).format('DD/MM/YYYY');
      data.price = Number(data.price.toString().replace(/,/g, ''));
      this.debitSV.addOrEditDebitSupplier(data).subscribe(r => {
        if (r && r.status == 1) {
          this.message.create('success', this.dataEdit && this.dataEdit.id ? 'Cập nhật thành công!' : 'Tạo thành công!');
          this.handleCancel();
        } else {
          this.message.create('error', r && r.message ? r.message : 'Đã có lổi xẩy ra. Vui lòng thử lại!');
        }
      });
    }
  }

}
