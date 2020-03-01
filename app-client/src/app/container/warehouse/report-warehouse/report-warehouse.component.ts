import { WarehouseService } from './../../../service/warehouse/warehouse.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-report-warehouse',
  templateUrl: './report-warehouse.component.html',
  styleUrls: ['./report-warehouse.component.scss']
})
export class ReportWarehouseComponent implements OnInit {

  isVisible = false;
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  listOfData = [];
  loading = true;
  dataEdit: any | null = null;
  filterForm: FormGroup;
  dateFormat = 'yyyy/MM/dd';
  warehouses = [];
  filter = {
    warehouse_id: '0',
    find: '',
    active: '1',
    dateft: new Date(),
    date: moment().format('DD/MM/YYYY'),
    offset: this.pageIndex - 1,
    limit: this.pageSize
  }
  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private whSV: WarehouseService) { }

  ngOnInit() {
    this.whSV.getAllWH().subscribe(r => {
      if (r && r.status == 1) {
        this.warehouses = r.data;
        this.filter.warehouse_id = this.warehouses[0].id + '';
        this.getAll();
      }
    });
  }

  getAll() {
    this.filter.date = this.filter.dateft ? moment(this.filter.dateft).format('DD/MM/YYYY') : this.filter.date;
    this.filter.warehouse_id = this.filter.warehouse_id ? this.filter.warehouse_id : '0';
    this.filter.active = this.filter.active ? this.filter.active : '1';
    this.filter.offset = (this.pageIndex - 1) * this.pageSize;
    this.filter.limit = this.pageSize;
    this.whSV.getInventoryProduct(this.filter).subscribe(res => {
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

  filterData() {
    this.getAll();
  }

  confirmDelete(id) {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc xóa trường này?',
      nzOkText: 'Xác nhận',
      nzOkType: 'danger',
      nzOnOk: () => this.delete({ id: id }),
      nzCancelText: 'Hủy',
    });
  }

  delete(objId) {
    this.whSV.deleteWH(objId).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Xóa thành công!');
        this.getAll();
      } else {
        this.message.create('error', r && r.message ? r.message : 'Có lỗi xẩy ra. Vui lòng thử lại!');
      }
    })
  }
}

