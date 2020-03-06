import { ProductService } from './../../../service/product/product.service';
import { WarehouseService } from './../../../service/warehouse/warehouse.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  isVisible = false;
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  listOfData = [];
  loading = true;
  dataEdit: any | null = null;
  products: [];
  warehouses = [];
  dateFormat = 'yyyy/MM/dd';
  isVisibleRecived = false;
  currentDataRecived: any | null = null;
  dateRecived = new Date();
  timeId: any = null;
  inputSearchProd = '';
  filter = {
    date: null,
    dest_id: '0',
    product_id: 0,
    from: '',
    to: '',
    offset: this.pageIndex - 1,
    limit: this.pageSize
  };
  constructor(
    private modalService: NzModalService,
    private message: NzMessageService,
    private warehouseSV: WarehouseService,
    private productSV: ProductService,
  ) { }

  ngOnInit() {
    this.getAll();
    this.warehouseSV.getAllWH().subscribe(r => {
      if (r && r.status == 1) {
        this.warehouses = r.data;
      }
    })
  }

  onSearchProduct(value) {
    if (value != '') {
      let ft = {
        find: value,
        supplier_id: 0,
        group_id: 0,
        active: 1,
        offset: 0,
        limit: 10
      }
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.productSV.getAllProduct(ft).subscribe(r => { if (r && r.status == 1) this.products = r.data; });
      }, 500);
    }
  }

  handleFilter() {
    this.pageIndex = 1;
    this.getAll();
  }

  getAll() {
    this.filter.offset = (this.pageIndex - 1) * this.pageSize;
    this.filter.limit = this.pageSize;
    this.filter.from = this.filter.date && this.filter.date[0] ? moment(this.filter.date[0]).format('DD/MM/YYYY') : '';
    this.filter.to = this.filter.date && this.filter.date[1] ? moment(this.filter.date[1]).format('DD/MM/YYYY') : '';
    this.filter.product_id = this.inputSearchProd == '' ? 0 : this.filter.product_id;

    this.warehouseSV.getTransaction(this.filter).subscribe(res => {
      if (res && res.status == 1) {
        if (res && res.status == 1) {
          this.listOfData = res.data;
          this.loading = false;
          this.total = res.total;
        }
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
    this.warehouseSV.deleteTransaction(objId).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Xóa thành công!');
        this.getAll();
      } else {
        this.message.create('error', r && r.message ? r.message : 'Có lỗi xẩy ra. Vui lòng thử lại!');
      }
    })
  }

  chooseProd(id) {
    this.filter.product_id = id;
  }

  

  formatDate(date, format) {
    return date ? moment(date).format(format) : '';
  }

  openModalReceived(data) {
    this.currentDataRecived = data;
    this.isVisibleRecived = true;
    this.dateRecived = data.status_id == 2 ? new Date(data.received_date) : this.dateRecived;
  }

  handleCancelRecived() {
    this.isVisibleRecived = false;
  }

  handleConfirmRecived() {
    let obj = {
      id: this.currentDataRecived.id,
      date: moment(this.dateRecived).format('DD/MM/YYYY')
    };
    this.warehouseSV.confirmRecivedDate(obj).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Nhận hàng thành công!');
        this.getAll();
        this.dateRecived = new Date();
      } else {
        this.message.create('error', r && r.message ? r.message : 'Có lỗi xẩy ra. Vui lòng thử lại!');
        this.dateRecived = new Date();
      }
    })
  }
}


