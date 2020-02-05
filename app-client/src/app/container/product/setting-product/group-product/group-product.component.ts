import { ProductService } from './../../../../service/product/product.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-product',
  templateUrl: './group-product.component.html',
  styleUrls: ['./group-product.component.scss']
})
export class GroupProductComponent implements OnInit {

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
    private productSV: ProductService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.productSV.getGroupProd().subscribe(res => {
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
      nzOnOk: () => this.delete({id: id}),
      nzCancelText: 'Hủy',
    });
  }

  delete(objId) {
    this.productSV.deleteGroup(objId).subscribe(r => {
      if (r && r.status == 1) {
        this.message.create('success', 'Xóa thành công!');
        this.getAll();
      } else {
        this.message.create('error', r && r.message ? r.message : 'Có lỗi xẩy ra. Vui lòng thử lại!');
      }
    })
  }

  getGroupName(groupID){
    let grp = this.listOfData.find(r=>{return r.id == groupID});
    return grp ? grp.name : '';
  }

}
