import {Injectable, inject} from '@angular/core';
import {switchMap, tap, Subscription} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {UsersPageStatus} from './types';
import {UsersPageActions} from './users-page-actions';
import {UsersPageStore} from './users-page-store';

@Injectable()
export class UsersPageEffects {

  private _usersPageStore = inject(UsersPageStore);
  private _usersPageActions = inject(UsersPageActions);
  private _usersService = inject(UserService);

  private _loadUsersEffect$ = this._usersPageActions.loadUsersAction$.pipe(
    switchMap(action => {
      this._usersPageStore.update(state => ({
        ...state,
        status: UsersPageStatus.LOADING
      }));
      return this._usersService.getUsers(action.pageIndex, action.pageSize)
        .pipe(
          tap(response => {
            const totalPages = Math.ceil(response.total / action.pageSize);
            this._usersPageStore.update(state => ({
              ...state,
              status: UsersPageStatus.LOADED,
              data: response.data,
              totalUsers: response.total,
              pageIndex: action.pageIndex,
              totalPages: totalPages,
              hasNextPage: action.pageIndex + 1 < totalPages,
              pageSize: action.pageSize,
              error: undefined,
            }));
          })
        )
    })
  );

  private _deleteUserEffect$ = this._usersPageActions.deleteUserAction$.pipe(
    switchMap(action => {
      this._usersPageStore.update(state => ({
        ...state,
        deleteInProgress: true
      }))
      return this._usersService.deleteUser(action.user.id)
        .pipe(
          tap(() => {
            this._usersPageStore.update(state => ({
              ...state,
              deleteInProgress: false
            }));
            action.onSuccess();
          })
        )
    })
  )

  private _deleteMultipleUsersEffect$ = this._usersPageActions.deleteMultipleUsersAction$.pipe(
    switchMap(action => {
      this._usersPageStore.update(state => ({
        ...state,
        deleteInProgress: true
      }))
      return this._usersService.deleteMultipleUsers(action.users)
        .pipe(
          tap(() => {
            this._usersPageStore.update(state => ({
              ...state,
              deleteInProgress: false
            }));
            action.onSuccess();
          })
        )
    })
  )

  private _createUserEffect$ = this._usersPageActions.createUserAction$.pipe(
    switchMap(action => {
      this._usersPageStore.update(state => ({
        ...state,
        createInProgress: true
      }))
      return this._usersService.createUser(action.createUserDto)
        .pipe(
          tap(() => {
            this._usersPageStore.update(state => ({
              ...state,
              createInProgress: false
            }));
            action.onSuccess();
          })
        )
    })
  )

  private _updateUserEffect$ = this._usersPageActions.updateUserAction$.pipe(
    switchMap(action => {
      this._usersPageStore.update(state => ({
        ...state,
        updateInProgress: true
      }))
      return this._usersService.updateUser(action.updateUserDto)
        .pipe(
          tap(() => {
            this._usersPageStore.update(state => ({
              ...state,
              updateInProgress: false
            }));
            action.onSuccess();
          })
        )
    })
  )

  private _subscriptions: Subscription[] = [];

  constructor() {
    this._subscriptions.push(this._loadUsersEffect$.subscribe());
    this._subscriptions.push(this._deleteUserEffect$.subscribe());
    this._subscriptions.push(this._deleteMultipleUsersEffect$.subscribe());
    this._subscriptions.push(this._createUserEffect$.subscribe());
    this._subscriptions.push(this._updateUserEffect$.subscribe());
  }

  public unregisterEffects() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
