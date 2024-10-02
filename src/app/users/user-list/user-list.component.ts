import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/users.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  deleteUser(id: number) {
    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');

    if (confirmation) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.loadUsers();
          alert('Usuario eliminado correctamente');
        },
        (error) => {
          console.error('Error deleting user', error);
          alert('Error al eliminar el usuario');
        }
      );
    }
  }

}
