import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Taskss } from 'src/app/core/models/Taskss';
import { TaskService } from '../Service/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number = 0;
  task: Taskss | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtenemos el id de la tarea desde la URL
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask();
  }

  loadTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe(
      (task: Taskss) => {
        this.task = task;
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status
        });
      },
      (error) => {
        console.error('Error al cargar la tarea', error);
      }
    );
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask: Taskss = {
        ...this.task,
        ...this.taskForm.value
      };
      this.taskService.updateTaskStatus(this.taskId, updatedTask).subscribe(
        () => {
          this.router.navigate(['/tasks/task-list']);
        },
        (error) => {
          console.error('Error al actualizar la tarea', error);
        }
      );
    }
  }
}

