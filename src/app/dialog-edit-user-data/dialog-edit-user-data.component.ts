import { Component } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UpdateService } from '../services/firebase/update.service';
import { UserData } from '../models/userdata.class';

@Component({
  selector: 'app-dialog-edit-user-data',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './dialog-edit-user-data.component.html',
  styleUrl: './dialog-edit-user-data.component.scss'
})
export class DialogEditUserDataComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserDataComponent>,
  ) { }

  updateService = new UpdateService();
  userData = new UserData();

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.updateService.updateUserData(this.userData);
    console.log('pressed save ');
    if (!this.updateService.dialogOpen) {
      this.dialogRef.close();
    }
  }
}
