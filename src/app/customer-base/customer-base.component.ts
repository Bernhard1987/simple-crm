import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormControl } from '@angular/forms';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { Customer } from '../models/customer.class';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { UpdateService } from '../services/firebase/update.service';

@Component({
  selector: 'app-customer-base',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    DialogAddCustomerComponent,
  ],
  templateUrl: './customer-base.component.html',
  styleUrl: './customer-base.component.scss'
})
export class CustomerBaseComponent {
  updateService = inject(UpdateService);
  customer = new Customer();

  unsubCustomerList;

  constructor(public dialog: MatDialog) { 
    this.unsubCustomerList = this.updateService.subCustomerList();
  }

  ngOnDestroy() {
    this.unsubCustomerList();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddCustomerComponent);
    this.updateService.dialogOpen = true;
  }
}