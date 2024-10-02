import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/Service/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token del usuario autenticado
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      // Clonar la solicitud para añadir el token en los headers
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}` // Asegúrate de que el token tenga el prefijo Bearer
        }
      });
    }
    // Continuar con la petición
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          // Cerrar sesión si el token ha expirado o es inválido
          this.authService.logout();
          location.reload();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
