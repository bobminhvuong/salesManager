import { ReportService } from './service/report/report.service';
import { CustomerService } from './service/customer/customer.service';
import { UserService } from './service/user/user.service';
import { LoginService } from './service/auth/login.service';
import { CanActivateService } from './service/auth/can-activate.service';
import { GlobalDataService } from './service/globalData/global-data.service';
import { AppRoutingModule } from './router/app-routing.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US, NzButtonModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { MainComponent } from './container/main/main.component';
import { MainService } from './service/main.service';
import { TableComponent } from './components/table/table.component';
import { ImageCtrComponent } from './components/image-ctr/image-ctr.component';
import { FileUploadService } from './service/fileUpload/file-upload.service';
import { UserComponent } from './container/user/user.component';
import { CustomerComponent } from './container/customer/customer.component';
import { CouUserComponent } from './container/user/cou-user/cou-user.component';
import { CouCustomerComponent } from './container/customer/cou-customer/cou-customer.component';
import { ProfileComponent } from './container/profile/profile.component';
import { AssetComponent } from './container/asset/asset.component';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { FormatVNDirective } from './directives/format-vn.directive';
import { PermDirective } from './directives/perm.directive';
import { SupplierService } from './service/partner/supplier.service';
import { SupplierComponent } from './container/partner/supplier/supplier.component';
import { ProductService } from './service/product/product.service';
import { CouSupplierComponent } from './container/partner/supplier/cou-supplier/cou-supplier.component';
import { ProductComponent } from './container/product/product/product.component';
import { SettingProductComponent } from './container/product/setting-product/setting-product.component';
import { BatchProductComponent } from './container/product/batch-product/batch-product.component';
import { CouProductComponent } from './container/product/product/cou-product/cou-product.component';
import { CouBatchComponent } from './container/product/batch-product/cou-batch/cou-batch.component';
import { CouGroupProductComponent } from './container/product/setting-product/group-product/cou-group-product/cou-group-product.component';
import { CouTypePackComponent } from './container/product/setting-product/type-pack/cou-type-pack/cou-type-pack.component';
import { UnitComponent } from './container/product/setting-product/unit/unit.component';
import { TypePackComponent } from './container/product/setting-product/type-pack/type-pack.component';
import { CouUnitComponent } from './container/product/setting-product/unit/cou-unit/cou-unit.component';
import { GroupProductComponent } from './container/product/setting-product/group-product/group-product.component';
import { ListWarehouseComponent } from './container/warehouse/list-warehouse/list-warehouse.component';
import { ReportWarehouseComponent } from './container/warehouse/report-warehouse/report-warehouse.component';
import { CouWarehouseComponent } from './container/warehouse/list-warehouse/cou-warehouse/cou-warehouse.component';
import { ListStoreComponent } from './container/store/list-store/list-store.component';
import { CouStoreComponent } from './container/store/list-store/cou-store/cou-store.component';
import { TransactionComponent } from './container/warehouse/transaction/transaction.component';
import { InputWHComponent } from './container/warehouse/transaction/input-wh/input-wh.component';
import { MoveOutTransactionComponent } from './container/warehouse/transaction/move-out-transaction/move-out-transaction.component';
import { InputTransactionComponent } from './container/warehouse/transaction/input-transaction/input-transaction.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    LoginComponent,
    TableComponent,
    ImageCtrComponent,
    UserComponent,
    CustomerComponent,
    CouUserComponent,
    CouCustomerComponent,
    ProfileComponent,
    AssetComponent,
    OnlyNumberDirective,
    FormatVNDirective,
    PermDirective,
    SupplierComponent,
    CouSupplierComponent,
    ProductComponent,
    SettingProductComponent,
    BatchProductComponent,
    CouProductComponent,
    CouBatchComponent,
    CouGroupProductComponent,
    CouTypePackComponent,
    UnitComponent,
    TypePackComponent,
    CouUnitComponent,
    GroupProductComponent,
    ListWarehouseComponent,
    ReportWarehouseComponent,
    CouWarehouseComponent,
    ListStoreComponent,
    CouStoreComponent,
    TransactionComponent,
    InputWHComponent,
    MoveOutTransactionComponent,
    InputTransactionComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    NzButtonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    GlobalDataService,
    CanActivateService,
    LoginService,
    MainService,
    UserService,
    FileUploadService,
    CustomerService,
    ReportService,
    SupplierService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
