import { SupplierService } from './../../../service/partner/supplier.service';
import { DebitService } from './../../../service/debit/debit.service';
import { CustomerService } from './../../../service/customer/customer.service';
import { environment } from './../../../../environments/environment.prod';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-debit-history',
  templateUrl: './debit-history.component.html',
  styleUrls: ['./debit-history.component.scss']
})
export class DebitHistoryComponent implements OnInit {
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
    from: '',
    to: '',
    date: null,
    limit: 0,
    offset: 0
  }

  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    private debitSV: DebitService,
    private partnerSV: SupplierService
  ) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      find: [''],
    });
    this.getAll();
    this.partnerSV.getAll().subscribe(r => { if (r && r.status == 1) { this.suppliers = r.data; } })
  }

  getAll() {
    this.filter.offset = (this.pageIndex - 1) * this.pageSize;
    this.filter.limit = this.pageSize;
    this.filter.from = this.filter.date && this.filter.date[0] ? moment(this.filter.date[0]).format('DD/MM/YYYY') : '';
    this.filter.to = this.filter.date && this.filter.date[1] ? moment(this.filter.date[1]).format('DD/MM/YYYY') : '';

    this.debitSV.getDebitHistory(this.filter).subscribe(res => {
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

  handlePreviewImg = (url) => {
    this.previewImage = environment.APICURRENTSERVE + '/' + url;
    this.previewVisible = true;
  };

  formatDate(date, fm) {
    return moment(date).format('DD/MM/YYYY');
  }
}
