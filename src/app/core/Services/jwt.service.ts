import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private tokenKey = 'currentUser'; // Llave para almacenar el token en localStorage

  // Obtener el token JWT del localStorage
  getToken(): string | null {
    const user = JSON.parse(localStorage.getItem(this.tokenKey) || '{}');
    return user?.token || null;
  }

  // Guardar el token en el localStorage
  saveToken(token: string): void {
    const currentUser = { token };
    localStorage.setItem(this.tokenKey, JSON.stringify(currentUser));
  }

  // Eliminar el token del localStorage (al cerrar sesión)
  destroyToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
