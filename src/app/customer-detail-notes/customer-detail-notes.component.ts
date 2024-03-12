import { Component, Input, inject } from '@angular/core';
import { UpdateService } from '../services/firebase/update.service';
import { ViewSingleNoteComponent } from './view-single-note/view-single-note.component';

@Component({
  selector: 'app-customer-detail-notes',
  standalone: true,
  imports: [ViewSingleNoteComponent],
  templateUrl: './customer-detail-notes.component.html',
  styleUrl: './customer-detail-notes.component.scss'
})
export class CustomerDetailNotesComponent {
  updateService = inject(UpdateService);

  unsubNotes;

  constructor() {
    console.log('constructor customer detail notes ', this.updateService.customerId);
      this.unsubNotes = this.updateService.getCurrentCustomerNotes(this.updateService.customerId);
  }

  ngOnInit(): void {
    console.log('ngoninit customer detail notes ', this.updateService.customerId);
    if (this.updateService.customerId) {
      this.updateService.getCurrentCustomerNotes(this.updateService.customerId);
    }
  }

  ngOnDestroy() {
      this.unsubNotes();
  }
}
