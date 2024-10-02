import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserListComponent } from '../users/user-list/user-list.component';
import { UserEditComponent } from '../users/user-edit/user-edit.component';
import { UserDetailsComponent } from '../users/user-details/user-details.component';
import { UserFormComponent } from '../users/user-form/user-form.component';
import { TaskFormComponent } from '../tasks/task-form/task-form.component';
import { TaskListComponent } from '../tasks/task-list/task-list.component';
import { TaskEditComponent } from '../tasks/task-edit/task-edit.component';
import { TaskDetailComponent } from '../tasks/task-details/task-details.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    UserEditComponent,
    UserFormComponent,
    UserDetailsComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskEditComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    UserEditComponent,
    UserFormComponent,
    UserDetailsComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskEditComponent
  ]
})
export class AuthModule { }
