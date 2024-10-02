import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { UserService } from '../Service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  user: User = { id: 0, username: '', email: '', password: '', roleId: 3 }; // Asigna un rol por defecto

  constructor(private userService: UserService, private router: Router) {}

  registerUser() {
    this.userService.registerUser(this.user).subscribe(
      () => {
        alert('Usuario registrado exitosamente');
        this.router.navigate(['/users/user-list']);
      },
      (error) => {
        console.error('Error registrando usuario', error);
      }
    );
  }
}
