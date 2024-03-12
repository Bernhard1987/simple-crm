import { Component, inject } from '@angular/core';
import { DialogEditUserDataComponent } from '../dialog-edit-user-data/dialog-edit-user-data.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UpdateService } from '../services/firebase/update.service';
import { UserData } from '../models/userdata.class';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  updateService = inject(UpdateService);

  unsubUserData;

  constructor(public dialog: MatDialog) { 
    this.unsubUserData = this.updateService.getCurrentUserData();
  }

  ngOnInit(): void {
    this.updateService.getCurrentUserData();
  }

  ngOnDestroy() {
    this.unsubUserData();
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserDataComponent);
    this.updateService.dialogOpen = true;
    dialog.componentInstance.userData = new UserData(this.updateService.currentUserData);
  }
}
