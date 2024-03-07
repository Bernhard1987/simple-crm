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
import { Note } from '../models/note.class';

@Component({
  selector: 'app-dialog-add-note-to-customer',
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
  templateUrl: './dialog-add-note-to-customer.component.html',
  styleUrl: './dialog-add-note-to-customer.component.scss'
})
export class DialogAddNoteToCustomerComponent {
  currentUserUid = '';
  currentCustomerUid = '';
  updateService = new UpdateService();
  note: Note = new Note();

  constructor(
    public dialogRef: MatDialogRef<DialogAddNoteToCustomerComponent>,
  ) { }

  getCleanNoteJson(note: Note) {
    return {
      title: note.title,
      content: note.content,
      creationTime: note.creationTime,
      createdByUid: note.createdByUid,
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.note.creationTime = Date.now();
    this.note.createdByUid = this.currentUserUid;
    this.updateService.saveNoteToCustomer(this.currentCustomerUid, this.getCleanNoteJson(this.note));
    if (!this.updateService.dialogOpen) {
      this.dialogRef.close();
    }
  }
}
