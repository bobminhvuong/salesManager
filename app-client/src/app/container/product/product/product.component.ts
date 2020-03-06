import { SupplierService } from './../../../service/partner/supplier.service';
import { ProductService } from './../../../service/product/product.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isVisible = false;
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  listOfData = [];
  filter = {
    find: '',
    supplier_id: '0',
    group_id: '0',
    active: true,
    activeTmp: '1',
    offset: 0,
    limit: this.pageSize
  };
  suppliers = [];
  groups = [];
  loading = true;
  dataEdit: any | null = null;
  filterForm: FormGroup;
  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private productSV: ProductService,
    private partnerSV: SupplierService) { }

  ngOnInit() {
    this.getAll();
    this.productSV.getGroupProd().subscribe(r => { if (r && r.status == 1) { this.groups = r.data; } })
    this.partnerSV.getAll().subscribe(r => { if (r && r.status == 1) { this.suppliers = r.data; } })
  }

  getAll() {
    this.filter.offset = (this.pageIndex - 1) * this.pageSize;
    this.filter.limit = this.pageSize;
    this.filter.active = this.filter.activeTmp == '1' ? true : false;
    this.loading = true;
    this.productSV.getAllProduct(this.filter).subscribe(res => {
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
    this.pageIndex = 1;
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
    this.productSV.deleteProduct(objId).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Xóa thành công!');
        this.getAll();
      } else {
        this.message.create('error', r && r.message ? r.message : 'Có lỗi xẩy ra. Vui lòng thử lại!');
      }
    })
  }

}

