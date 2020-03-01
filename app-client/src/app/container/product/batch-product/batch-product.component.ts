import { ProductService } from './../../../service/product/product.service';
import { PackageService } from './../../../service/package/package.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batch-product',
  templateUrl: './batch-product.component.html',
  styleUrls: ['./batch-product.component.scss']
})
export class BatchProductComponent implements OnInit {

  isVisible = false;
  pageIndex = 1;
  pageSize = 50;
  total = 1;
  listOfData = [];
  loading = true;
  dataEdit: any | null = null;
  filterForm: FormGroup;
  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private packageSV: PackageService,
    private productSV: ProductService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.packageSV.getAllTypePack().subscribe(res => {
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
    this.packageSV.deleteTypePack(objId).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Xóa thành công!');
        this.getAll();
      } else {
        this.message.create('error', r && r.message ? r.message : 'Có lỗi xẩy ra. Vui lòng thử lại!');
      }
    })
  }

}
