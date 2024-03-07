import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { FormatDateService } from '../../services/format-date/format-date.service';

@Component({
  selector: 'app-view-single-note',
  standalone: true,
  imports: [
    MatCardModule,
    MatIcon
  ],
  templateUrl: './view-single-note.component.html',
  styleUrl: './view-single-note.component.scss'
})
export class ViewSingleNoteComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() creationTime: number = 0;
  @Input() createdByUid: string = '';

  formatDate = new FormatDateService();

  formatCurrentDate() {
    return this.formatDate.formatDateDDMMYYYYHHMM(this.creationTime);
  }

  resolveUidName() {
    return this.createdByUid;
  }
}
