import { BdsComponent } from './../container/bds/bds.component';
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

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'manager', component: MainComponent,canActivate: [CanActivateService], data: {role: 'LOGIN'},  children: [
            { path: '',  redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'customer',canActivate: [CanActivateService], data: {role: 'admin'}, component: CustomerComponent },
            { path: 'user',canActivate: [CanActivateService], data: {role: 'admin'}, component: UserComponent },
            { path: 'profile',canActivate: [CanActivateService], data: {role: 'admin'}, component: ProfileComponent },
            { path: 'assets',canActivate: [CanActivateService], data: {role: 'admin'}, component: AssetComponent },
            { path: 'bds',canActivate: [CanActivateService], data: {role: 'admin'}, component: BdsComponent },
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
