import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerBaseComponent } from './customer-base/customer-base.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'customers', component: CustomerBaseComponent },
    { path: 'customers/:id', component: CustomerDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
