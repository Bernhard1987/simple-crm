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
import { Customer } from '../models/customer.class';
import { UpdateService } from '../firebase-services/update.service';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  updateService = new UpdateService();
  customer = new Customer();
  customerId: string | null = '';

  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.updateService.updateCustomer(this.customer, this.customerId);
    if (!this.updateService.dialogOpen) {
      this.dialogRef.close();
    }
  }
}
