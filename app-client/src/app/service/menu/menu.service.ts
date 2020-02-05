import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getMenu() {
    return [
      {
        title: 'Trang chủ',
        url: '/manager/dashboard',
        role: 'admin',
        icon: 'home'
      },
      {
        title: 'Hàng hóa',
        url: '',
        icon: 'database',
        role: 'admin',
        subMenu: [
          {
            title: 'Hàng hóa',
            url: '/manager/product',
            role: 'admin',
          },
          {
            title: 'Lô hàng hóa',
            url: '/manager/batchProduct',
            role: 'admin',
          },
          {
            title: 'Cài đặt hàng hóa',
            url: '/manager/settingProduct',
            role: 'admin',
          }
        ]
      },
      {
        title: 'Đối tác',
        url: '',
        icon: 'user',
        role: 'admin',
        subMenu: [
          {
            title: 'Nhà cung cấp',
            url: '/manager/supplier',
            role: 'admin',
          }
        ]
      },
      {
        title: 'Nhân viên',
        url: '',
        icon: 'user',
        role: 'admin',
        subMenu: [
          {
            title: 'Danh sách',
            url: '/manager/user',
            role: 'admin',
          }
        ]
      },
      {
        title: 'Khách hàng',
        url: '',
        icon: 'usergroup-add',
        role: 'admin',
        subMenu: [
          {
            title: 'Danh sách',
            url: '/manager/customer',
            role: 'admin',
          }
        ]
      }
    ]
  }
}
