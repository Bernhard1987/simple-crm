import { Component, inject } from '@angular/core';
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
import { provideNativeDateAdapter } from '@angular/material/core';
import { Customer } from '../models/customer.class';
import { UpdateService } from '../services/firebase/update.service';

@Component({
  selector: 'app-dialog-add-customer',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './dialog-add-customer.component.html',
  styleUrl: './dialog-add-customer.component.scss'
})
export class DialogAddCustomerComponent {
  updateService = inject(UpdateService);

  customer = new Customer();
  birthDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<DialogAddCustomerComponent>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.customer.birthDate = this.birthDate.getTime(); //converts date object to timestamp
    this.updateService.saveCustomer(this.updateService.getCleanCustomerJson(this.customer));
    if (!this.updateService.dialogOpen) {
      this.dialogRef.close();
    }
  }
}
