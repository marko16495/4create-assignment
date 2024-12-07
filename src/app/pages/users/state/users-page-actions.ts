import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LoadDataAction, DeleteUserAction, CreateUserAction, UpdateUserAction} from './types';

@Injectable()
export class UsersPageActions {

  loadDataAction$ = new Subject<LoadDataAction>();
  deleteUserAction$ = new Subject<DeleteUserAction>();
  createUserAction$ = new Subject<CreateUserAction>();
  updateUserAction$ = new Subject<UpdateUserAction>();

}
