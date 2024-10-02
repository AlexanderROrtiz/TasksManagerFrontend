import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/auth/login'; // Verifica si la ruta actual es la de login
  }

  goHome() {
    this.router.navigate(['/dashboard/home']); // Cambia '/home' por la ruta que necesites
  }

  // Método para logout
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }
}
