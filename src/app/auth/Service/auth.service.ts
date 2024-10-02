import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterUserDto } from 'src/app/core/models/RegisterUserDto';
import { JwtService } from 'src/app/core/Services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5240';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router, private jwtService: JwtService) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Método para login
  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/loginUser`, { username, password }).pipe(
      map((user) => {
        if (user && user.token) {
          this.jwtService.saveToken(user.token); // Usa JwtService para guardar el token
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  // Método para logout
  logout() {
    this.jwtService.destroyToken(); // Usa JwtService para eliminar el token
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  // Método para registrar un usuario
  register(user: RegisterUserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/RegisterUser`, user);
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // Obtener el token
  getToken(): string | null {
    return this.jwtService.getToken(); // Método del JwtService para obtener el token
  }

  // Métodos para verificar roles
  isAdmin(): boolean {
    const user = this.currentUserValue;
    return user && user.role === 'Administrador';
  }

  isSupervisor(): boolean {
    const user = this.currentUserValue;
    return user && user.role === 'Supervisor';
  }

  isEmployee(): boolean {
    const user = this.currentUserValue;
    return user && user.role === 'Empleado';
  }
}
