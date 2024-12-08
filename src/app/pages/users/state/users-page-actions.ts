import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LoadUsersAction, DeleteUserAction, CreateUserAction, UpdateUserAction, DeleteMultipleUsersAction} from './types';

@Injectable()
export class UsersPageActions {

  loadUsersAction$ = new Subject<LoadUsersAction>();
  deleteUserAction$ = new Subject<DeleteUserAction>();
  deleteMultipleUsersAction$ = new Subject<DeleteMultipleUsersAction>();
  createUserAction$ = new Subject<CreateUserAction>();
  updateUserAction$ = new Subject<UpdateUserAction>();

}
