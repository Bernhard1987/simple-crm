import { Component, inject } from '@angular/core';
import { UpdateService } from '../services/firebase/update.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  updateService = inject(UpdateService);
}
