import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/Guard/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './dashboard/home/home.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskDetailComponent } from './tasks/task-details/task-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'dashboard/home', component: HomeComponent, canActivate: [AuthGuard] },
  // Rutas para tareas
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'tasks/task-list', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'tasks/detail/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'tasks/edit/:id', component: TaskEditComponent, canActivate: [AuthGuard] },
  { path: 'tasks/new', component: TaskFormComponent, canActivate: [AuthGuard] },
  { path: 'tasks/task-form', component: TaskFormComponent },
  // Rutas para usuarios
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'users/user-list', component: UserListComponent },
  { path: 'users/user-edit/:id', component: UserEditComponent },
  { path: 'users/user-form', component: UserFormComponent },
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
