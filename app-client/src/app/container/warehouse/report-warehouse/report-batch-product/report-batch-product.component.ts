import { StoreService } from './../../../../service/store/store.service';
import { WarehouseService } from './../../../../service/warehouse/warehouse.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-report-batch-product',
  templateUrl: './report-batch-product.component.html',
  styleUrls: ['./report-batch-product.component.scss']
})
export class ReportBatchProductComponent implements OnInit {

  @Input() dataEdit: any;
  @Input() isVisible: boolean;
  @Output() closeModal = new EventEmitter();
  pageIndex = 1;
  pageSize = 20;
  total = 1;
  listOfData = [];
  loading = true;
  stores = [];
  filter = {
    warehouse_id: 0,
    product_id: 0,
    active: 1,
    date: moment().format('DD/MM/YYYY'),
    offset: this.pageIndex - 1,
    limit: this.pageSize
  }

  constructor(
    private whSV: WarehouseService
  ) { }

  ngOnInit() {
    if(this.dataEdit){
      this.filter.warehouse_id = this.dataEdit.warehouse_id;
      this.filter.date = moment(this.dataEdit.date).format('DD/MM/YYYY');
      this.filter.product_id = this.dataEdit.id;
      this.filter.active = this.dataEdit.active;
      this.getAll();
    }
  }

  getAll() {
    this.filter.offset = (this.pageIndex - 1) * this.pageSize;
    this.filter.limit = this.pageSize;
    this.whSV.getInventoryBatchProduct(this.filter).subscribe(res => {
      if (res && res.status == 1) {
        this.listOfData = res.data;
        this.loading = false;
        this.total = res.total;
      }
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit(this.isVisible);
  }

  formatDate(date, format) {
    return date ? moment(date).format(format) : '';
  }
}
