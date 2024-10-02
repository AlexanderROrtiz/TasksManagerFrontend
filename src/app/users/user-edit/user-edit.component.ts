import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { UserService } from '../Service/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;
  errorMessage: string = '';

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.user = { id: 0, username: '', email: '', password: '', roleId: 3 }; // Inicialización
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user', error);
      }
    );
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }

  updateUser() {
    this.userService.updateUser(this.user.id, this.user).subscribe(
      () => {
        alert('Usuario actualizado exitosamente');
        this.router.navigate(['/users/user-list']);
      },
      (error) => {
        this.errorMessage = 'Error al actualizar el usuario.';
      }
    );
  }
}
