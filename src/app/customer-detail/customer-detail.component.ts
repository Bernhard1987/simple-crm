import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UpdateService } from '../firebase-services/update.service';
import { CustomerDetailNotesComponent } from '../customer-detail-notes/customer-detail-notes.component';
import { DialogEditCustomerComponent } from '../dialog-edit-customer/dialog-edit-customer.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { Customer } from '../models/customer.class';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatMenuModule,
    CustomerDetailNotesComponent,
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent {
  unsubSingle: any;

  customerId: string | null = '';

  updateService = new UpdateService;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.customerId = paramMap.get('id');
      if (this.customerId) {
        this.updateService.getSingleCustomerData(this.customerId);
        this.updateService.getCurrentCustomerNotes(this.customerId);
      }
    })
  }

  editCustomerDetail() {
    const dialog = this.dialog.open(DialogEditCustomerComponent);
    this.updateService.dialogOpen = true;
    dialog.componentInstance.customer = new Customer(this.updateService.currentCustomer);
    dialog.componentInstance.customerId = this.customerId;
  }

  editCustomerAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    this.updateService.dialogOpen = true;
    dialog.componentInstance.customer = new Customer(this.updateService.currentCustomer);
    dialog.componentInstance.customerId = this.customerId;
  }
}
