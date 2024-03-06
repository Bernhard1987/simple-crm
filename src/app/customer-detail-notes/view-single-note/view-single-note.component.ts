import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

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

}
