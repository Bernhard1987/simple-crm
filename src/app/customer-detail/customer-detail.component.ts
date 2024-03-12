import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UpdateService } from '../services/firebase/update.service';
import { CustomerDetailNotesComponent } from '../customer-detail-notes/customer-detail-notes.component';
import { DialogEditCustomerComponent } from '../dialog-edit-customer/dialog-edit-customer.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { Customer } from '../models/customer.class';
import { DialogAddNoteToCustomerComponent } from '../dialog-add-note-to-customer/dialog-add-note-to-customer.component';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CustomerDetailNotesComponent,
    DialogAddNoteToCustomerComponent
  ],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent {
  unsubSingle: any;

  updateService = inject(UpdateService);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log('hello');
    this.route.paramMap.subscribe(paramMap => {
      const customerId = paramMap.get('id');
      console.log("Before calling", customerId);
      if (customerId === null) {
        console.error('Customer ID is null');
        return;
      }
      this.updateService.customerId = customerId;
      console.log("Before calling getSingleCustomerData", this.updateService.customerId);
      this.updateService.getSingleCustomerData(this.updateService.customerId);
    })
  }

  addNoteToCustomer() {
    const dialog = this.dialog.open(DialogAddNoteToCustomerComponent);
    this.updateService.dialogOpen = true;
    if (this.updateService.currentUserUid) {
      dialog.componentInstance.currentUserUid = this.updateService.currentUserUid;
    }
    if (this.updateService.customerId) {
      dialog.componentInstance.currentCustomerUid = this.updateService.customerId;
    }
  }

  editCustomerDetail() {
    const dialog = this.dialog.open(DialogEditCustomerComponent);
    this.updateService.dialogOpen = true;
    dialog.componentInstance.customer = new Customer(this.updateService.currentCustomer);
    dialog.componentInstance.customerId = this.updateService.customerId;
  }

  editCustomerAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    this.updateService.dialogOpen = true;
    dialog.componentInstance.customer = new Customer(this.updateService.currentCustomer);
    dialog.componentInstance.customerId = this.updateService.customerId;
  }
}
