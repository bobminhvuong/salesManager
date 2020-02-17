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
  pageSize = 20;
  total = 1;
  listOfData = [];
  loading = true;
  dataEdit: any | null = null;
  products: [];
  warehouses = [];
  dateFormat ='yyyy/MM/dd'
  filter = {
    date: null,
    dest_id: '0',
    product_id: '0',
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
    this.getProd();
  }

  getProd(){
    let filterProd = {
      find: '',
      supplier_id: 0,
      group_id: 0,
      active: 1,
      offset: 0,
      limit: 10000000
    }
    this.productSV.getAllProduct(filterProd).subscribe(r => { if (r && r.status == 1) this.products = r.data; });
    this.warehouseSV.getAllWH().subscribe(r => { if (r && r.status == 1) this.warehouses = r.data; });
  }

  getAll() {
    this.filter.offset = (this.pageIndex - 1) * this.pageSize;
    this.filter.limit = this.pageSize;
    this.filter.from = this.filter.date && this.filter.date[0] ? moment(this.filter.date[0]).format('DD/MM/YYYY') : '';
    this.filter.to = this.filter.date && this.filter.date[1] ? moment(this.filter.date[1]).format('DD/MM/YYYY') : '';

    this.warehouseSV.getTransaction(this.filter).subscribe(res => {
      this.listOfData = res.data;
      this.loading = false;
      this.total = res.count;
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
    this.warehouseSV.deleteTransaction(objId).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Xóa thành công!');
        this.getAll();
      } else {
        this.message.create('error', r && r.message ? r.message : 'Có lỗi xẩy ra. Vui lòng thử lại!');
      }
    })
  }

  formatDate(date, format) {
    return date ? moment(date).format(format) : '';
  }
}


