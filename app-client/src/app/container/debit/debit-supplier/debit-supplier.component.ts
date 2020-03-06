import { SupplierService } from './../../../service/partner/supplier.service';
import { DebitService } from './../../../service/debit/debit.service';
import { CustomerService } from './../../../service/customer/customer.service';
import { environment } from './../../../../environments/environment.prod';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-debit-supplier',
  templateUrl: './debit-supplier.component.html',
  styleUrls: ['./debit-supplier.component.scss']
})
export class DebitSupplierComponent implements OnInit {
  isVisible = false;
  pageIndex = 1;
  pageSize = 20;
  total = 1;
  listOfData = [];
  loading = true;
  dataEdit: any | null = null;
  filterForm: FormGroup;
  previewImage: string | undefined = '';
  previewVisible = false;
  suppliers = [];

  filter = {
    supplier_id: '0',
    limit: 0,
    offset: 0
  }

  constructor(
    private modalService: NzModalService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private debitSV: DebitService,
    private supplierSV: SupplierService
  ) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      find: [''],
    });
    this.getAll();
    this.supplierSV.getAll().subscribe(r => { if (r && r.status == 1) { this.suppliers = r.data; } })
  }

  getAll() {
    this.filter.offset = (this.pageIndex - 1) * this.pageSize;
    this.filter.limit = this.pageSize;
    this.loading = true;
    this.debitSV.getDebitSupplier(this.filter).subscribe(res => {
      if (res && res.status == 1) {
        this.listOfData = res.data;
        this.loading = false;
        this.total = res.total;
      }
    });
  }

  handleCorU(client) {
    this.dataEdit = client ? client : {};
    this.isVisible = true;
  }

  closeModal(e) {
    this.isVisible = e;
    this.getAll();
  }

  handleFilter() {
    this.pageIndex =1;
    this.getAll();
  }

  formatDate(date, fm) {
    return moment(date).format(fm);
  }
}
