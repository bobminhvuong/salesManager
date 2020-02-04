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
