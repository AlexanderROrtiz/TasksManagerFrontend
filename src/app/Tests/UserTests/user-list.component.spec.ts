import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/users/Service/users.service';
import { UserListComponent } from 'src/app/users/user-list/user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    // Crea un espía del UserService
    userServiceMock = jasmine.createSpyObj('UserService', ['getAllUsers', 'deleteUser']);

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [{ provide: UserService, useValue: userServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load users on init', () => {
    const mockUsers: User[] = [
      { id: 1, username: 'User 1', email: 'user1@example.com', roleId: 1 },
      { id: 2, username: 'User 2', email: 'user2@example.com', roleId: 2 }
    ];

    userServiceMock.getAllUsers.and.returnValue(of(mockUsers));

    component.loadUsers();

    expect(component.users.length).toBe(2);
    expect(component.users).toEqual(mockUsers);
  });

  it('should delete a user and show confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
    userServiceMock.deleteUser.and.returnValue(of(null));

    component.deleteUser(1);

    expect(userServiceMock.deleteUser).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalledWith('Usuario eliminado correctamente');
  });

  it('should not delete a user if confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    userServiceMock.deleteUser.and.returnValue(of(null));

    component.deleteUser(1);

    expect(userServiceMock.deleteUser).not.toHaveBeenCalled();
  });

  it('should handle errors when loading users', () => {
    userServiceMock.getAllUsers.and.returnValue(throwError('Error loading users'));

    component.loadUsers();

    expect(component.users.length).toBe(0);
  });

  it('should handle errors when deleting a user', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    userServiceMock.deleteUser.and.returnValue(throwError('Error deleting user'));
    spyOn(window, 'alert');

    component.deleteUser(1);

    expect(window.alert).toHaveBeenCalledWith('Error al eliminar el usuario');
  });
});
