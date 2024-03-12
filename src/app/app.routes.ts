import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerBaseComponent } from './customer-base/customer-base.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'customerbase', component: CustomerBaseComponent },
    { path: 'customer', redirectTo:'/customerbase',  pathMatch: 'full' },
    { path: 'customer/:id', component: CustomerDetailComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user', component: UserDetailsComponent },
];
