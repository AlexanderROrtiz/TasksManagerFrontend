import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Taskss } from 'src/app/core/models/Taskss';
import { TaskService } from '../Service/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailComponent implements OnInit {
  taskId: number = 0;
  task: Taskss | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask();
  }

  loadTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe(
      (task: Taskss) => {
        this.task = task;
      },
      (error) => {
        console.error('Error al cargar los detalles de la tarea', error);
      }
    );
  }
}
