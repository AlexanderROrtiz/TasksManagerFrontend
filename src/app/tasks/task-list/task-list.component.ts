import { Component, OnInit } from '@angular/core';
import { TaskService } from '../Service/tasks.service';
import { AuthService } from 'src/app/auth/Service/auth.service';
import { Taskss } from 'src/app/core/models/Taskss';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Taskss[] = [];
  isAdmin: boolean = false;
  isSupervisorOrAdmin: boolean = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.isAdmin = this.authService.isAdmin();
    //this.isSupervisorOrAdmin = this.isAdmin || this.authService.isSupervisor();

    this.isAdmin = true; // Cambiar a tu lógica de autenticación real
    this.isSupervisorOrAdmin = true; // Cambiar a tu lógica de autenticación real
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log(this.tasks); // Verifica que se estén recibiendo las tareas
    });
  }

  deleteTask(id: number) {
    if (this.isSupervisorOrAdmin && confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.loadTasks(); // Vuelve a cargar las tareas después de eliminar
      });
    } else {
      alert('No tienes permiso para eliminar esta tarea.'); // Mensaje de error si no tiene permisos
    }
  }

  editTask(id: number) {
    if (this.isSupervisorOrAdmin) {
      this.router.navigate(['/tasks/task-edit', id]); // Redirige a la ruta de edición
    } else {
      alert('No tienes permiso para editar esta tarea.'); // Mensaje de error si no tiene permisos
    }
  }

  viewTask(id: number) {
    this.router.navigate(['/tasks/task-details', id]); // Redirige a la ruta de detalles
  }

  createTask() {
    if (this.isSupervisorOrAdmin) {
      this.router.navigate(['/tasks/task-form']); // Redirige a la ruta de creación
    } else {
      alert('No tienes permiso para crear tareas.'); // Mensaje de error si no tiene permisos
    }
  }
}
