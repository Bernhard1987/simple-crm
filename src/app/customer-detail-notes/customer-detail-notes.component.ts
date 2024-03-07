import { Component } from '@angular/core';
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
  notesCollection = [];

  updateService = new UpdateService();

  getCustomerNotes() {
    
  }

}
