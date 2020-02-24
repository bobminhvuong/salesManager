import { SupplierService } from './../../../service/partner/supplier.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  isVisible = false;
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  listOfData = [];
  loading = true;
  dataEdit: any | null = null;
  filterForm: FormGroup;
  previewImage: string | undefined = '';
  previewVisible = false;

  constructor(
    private modalService: NzModalService, 
    private fb: FormBuilder, 
    private customerSV: CustomerService,
    private supplierSV: SupplierService,
    private message: NzMessageService
    ) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      find: [''],
    });
    this.getAll();
  }

  getAll() {
    let val = {
      find: this.filterForm.value.find,
      offset: 0,
      limit: 50
    }

    this.supplierSV.getAll().subscribe(res => {
      this.listOfData = res.data;
      this.loading = false;
      this.total = res.total;
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

  confirmDeleteSup(id) {
    this.modalService.confirm({
      nzTitle: 'Bạn có chắc xóa nhà cung cấp này?',
      nzOkText: 'Xác nhận',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteSup({id: id}),
      nzCancelText: 'Hủy',
    });
  }

  deleteSup(objId) {
    this.supplierSV.delete(objId).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Xóa thành công!');
        this.getAll();
      } else {
        this.message.create('error', r && r.message ? r.message : 'Có lỗi xẩy ra. Vui lòng thử lại!');
      }
    })
  }
}

