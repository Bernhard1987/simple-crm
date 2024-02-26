import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { UpdateService } from '../firebase-services/update.service';
import { onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  unsubSingle: any;

  userId: string | null = '';

  updateService = new UpdateService;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('got id ', this.userId);
      if (this.userId != null) {
        this.updateService.getSingleUserData(this.userId);
      }
    })
  }

  getUser() {

  }
}
