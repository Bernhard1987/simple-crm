import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UpdateService } from './services/firebase/update.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerBaseComponent } from './customer-base/customer-base.component';
import { NavSettingsComponent } from './nav-settings/nav-settings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    DashboardComponent,
    CustomerBaseComponent,
    LoginComponent,
    RegisterComponent,
    NavSettingsComponent,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simple-crm';

  updateService = inject(UpdateService);

  ngOnInit(): void {
    this.updateService.initUser();
  }

}
