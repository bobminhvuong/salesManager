import { MoveOutTransactionComponent } from './../container/warehouse/transaction/move-out-transaction/move-out-transaction.component';
import { InputTransactionComponent } from './../container/warehouse/transaction/input-transaction/input-transaction.component';
import { TransactionComponent } from './../container/warehouse/transaction/transaction.component';
import { ListStoreComponent } from './../container/store/list-store/list-store.component';
import { ListWarehouseComponent } from './../container/warehouse/list-warehouse/list-warehouse.component';
import { SettingProductComponent } from './../container/product/setting-product/setting-product.component';
import { BatchProductComponent } from './../container/product/batch-product/batch-product.component';
import { ProductComponent } from './../container/product/product/product.component';
import { AssetComponent } from './../container/asset/asset.component';
import { ProfileComponent } from './../container/profile/profile.component';
import { UserComponent } from './../container/user/user.component';
import { CustomerComponent } from './../container/customer/customer.component';
import { LoginComponent } from './../login/login.component';
import { CanActivateService } from './../service/auth/can-activate.service';
import { DashboardComponent } from './../container/dashboard/dashboard.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../container/main/main.component';
import { SupplierComponent } from '../container/partner/supplier/supplier.component';
import { ReportWarehouseComponent } from '../container/warehouse/report-warehouse/report-warehouse.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'manager', component: MainComponent,canActivate: [CanActivateService], data: {role: 'LOGIN'},  children: [
            { path: '',  redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'customer', data: {role: 'admin'}, component: CustomerComponent },
            { path: 'user', data: {role: 'admin'}, component: UserComponent },
            { path: 'profile', data: {role: 'admin'}, component: ProfileComponent },
            { path: 'assets', data: {role: 'admin'}, component: AssetComponent },

            //parner
            { path: 'supplier', data: {role: 'admin'}, component: SupplierComponent },

            //product
            { path: 'product', component: ProductComponent},
            { path: 'batchProduct', component: BatchProductComponent},
            { path: 'settingProduct', component: SettingProductComponent },

            //store
            { path: 'listStore', component: ListStoreComponent },

            //warehouse
            { path: 'listWH', component: ListWarehouseComponent },
            { path: 'transaction', component: TransactionComponent },
            { path: 'addTransaction/:id', component:InputTransactionComponent  },
            { path: 'moveOutTransaction/:id', component:MoveOutTransactionComponent  },
            { path: 'reportWH', component: ReportWarehouseComponent },

        ]
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, { useHash: true })
    ]
})
export class AppRoutingModule { }
