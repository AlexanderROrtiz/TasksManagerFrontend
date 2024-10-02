import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/Service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {} // Inyecta Router

  ngOnInit(): void {
    // Puedes implementar lógica inicial aquí si es necesario
  }
  // Métodos para navegar a otras rutas
  navigateToTasks() {
    this.router.navigate(['/tasks']);
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }
}
