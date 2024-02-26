import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UpdateService } from '../firebase-services/update.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  unsubSingle: any;

  userId: string | null = '';

  updateService = new UpdateService;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      if (this.userId != null) {
        this.updateService.getSingleUserData(this.userId);
      }
    })
  }

  editUserDetail() {
    this.dialog.open(DialogEditUserComponent);
    this.updateService.dialogOpen = true;
  }

  editUserAddress() {
    this.dialog.open(DialogEditAddressComponent);
    this.updateService.dialogOpen = true;
  }
}
