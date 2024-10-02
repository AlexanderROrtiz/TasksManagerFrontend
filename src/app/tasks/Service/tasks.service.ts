import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/Service/auth.service';
import { AssignTaskDto } from 'src/app/core/models/AssignTaskDto';
import { Taskss } from 'src/app/core/models/Taskss';
import { UpdateTaskStatusDto } from 'src/app/core/models/UpdateTaskStatusDto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5240';

  constructor(private http: HttpClient, private authService: AuthService) {} // Inyecta AuthService

  // Método para obtener el token de autorización
  private getAuthorizationHeaders() {
    const token = this.authService.getToken(); // Usa el método getToken del AuthService
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' // Asegúrate de establecer el tipo de contenido si es necesario
    });
  }

  getAllTasks(): Observable<Taskss[]> {
    // Ajustado para usar el endpoint correcto
    return this.http.get<Taskss[]>(`${this.apiUrl}/GetAllTasks - Rol Administrador`, { headers: this.getAuthorizationHeaders() });
  }

  getTaskById(id: number): Observable<Taskss> {
    return this.http.get<Taskss>(`${this.apiUrl}/GetTaskById - Rol Administrador y Supervisor?id=${id}`, { headers: this.getAuthorizationHeaders() });
  }

  createTask(task: Taskss): Observable<any> {
   // return this.http.post(`${this.apiUrl}/CreateTask - Rol Administrador`, task, { headers: this.getAuthorizationHeaders() });
    return this.http.post(`${this.apiUrl}/CreateTask - Rol Administrador`, task);
  }

  updateTaskStatus(id: number, statusDto: UpdateTaskStatusDto): Observable<any> { // Ajustado para usar UpdateTaskStatusDto
    return this.http.put(`${this.apiUrl}/UpdateTaskStatus - Rol Administrador, Supervisor y Empleado?id=${id}`, statusDto, { headers: this.getAuthorizationHeaders() });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteTask - Rol Administrador?id=${id}`, { headers: this.getAuthorizationHeaders() }); // Agrega los encabezados
  }

  getUserTasks(): Observable<Taskss[]> { // Método para obtener tareas de un usuario
    return this.http.get<Taskss[]>(`${this.apiUrl}/GetUserTasks - Rol Empleado`, { headers: this.getAuthorizationHeaders() });
  }

  assignTask(id: number, assignTaskDto: AssignTaskDto): Observable<any> { // Método para asignar tarea
    return this.http.put(`${this.apiUrl}/AssignTask/${id} - Rol Supervisor`, assignTaskDto, { headers: this.getAuthorizationHeaders() });
  }
}
