import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Customer } from '../models/customer.class';
import { NewUser } from '../models/new-user.class';
import { UpdateService } from '../services/firebase/update.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgClass,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  updateService = inject(UpdateService);

  user = {
    email: '',
    password: '',
    passwordConfirm: ''
  }

  registerUser() {
    this.updateService.createNewUser(this.user);
  }

}
