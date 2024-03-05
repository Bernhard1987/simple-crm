import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UpdateService } from '../firebase-services/update.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
     MatCardModule,
     MatIconModule,
     MatButtonModule,
     MatMenuModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  updateService = new UpdateService();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
        this.updateService.getCurrentUserData();
  }

  editUserDetail() {
    console.log('editUserDetail clicked');
  }

}
