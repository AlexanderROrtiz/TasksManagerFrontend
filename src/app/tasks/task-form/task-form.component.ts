import { Component, OnInit } from '@angular/core';
import { TaskService } from '../Service/tasks.service';
import { AuthService } from 'src/app/auth/Service/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Taskss } from 'src/app/core/models/Taskss';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number =0; // Para el modo edición
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Pendiente', Validators.required], // Valor por defecto
      assignedToUserId: [null] // Puede ser nulo
    });
  }

  ngOnInit(): void {
    // Verifica si hay un taskId en la ruta para saber si es modo edición
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.taskId = +id;
        this.isEditMode = true;
        this.loadTask(this.taskId);
      }
    });
  }

  loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe((task: Taskss) => {
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        status: task.status,
        assignedToUserId: task.assignedToUserId
      });
    });
  }

  goToTask() {
    this.router.navigate(['/tasks']);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData: Taskss = this.taskForm.value;

      if (this.isEditMode && this.taskId !== null) {
        // Si estamos en modo edición, actualiza la tarea existente
        this.taskService.updateTaskStatus(this.taskId, taskData).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      } else {
        // Si no estamos en modo edición, crea una nueva tarea
        this.taskService.createTask(taskData).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      }
    }
  }
}
