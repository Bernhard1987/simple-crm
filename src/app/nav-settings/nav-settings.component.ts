import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UpdateService } from '../services/firebase/update.service';

@Component({
  selector: 'app-nav-settings',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    RouterLink
  ],
  templateUrl: './nav-settings.component.html',
  styleUrl: './nav-settings.component.scss'
})
export class NavSettingsComponent {
  updateService = inject(UpdateService);

  logoutUser() {
    this.updateService.logoutUser();
  }
}