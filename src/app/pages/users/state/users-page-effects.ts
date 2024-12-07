import {Injectable, inject} from '@angular/core';
import {switchMap, tap} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {UsersPageActions} from './users-page-actions';
import {UsersPageStore} from './users-page-store';

@Injectable()
export class UsersPageEffects {

  private _usersPageStore = inject(UsersPageStore);
  private _usersPageActions = inject(UsersPageActions);
  private _usersService = inject(UserService);

  private _store = this._usersPageStore.getStore();

  private loadDataEffect$ = this._usersPageActions.loadDataAction$.pipe(
    switchMap(action => {
      this._store.update(state => ({
        ...state,
        status: 'loading'
      }));
      const currentState = this._store.getValue();
      const actionValue = action(currentState);
      return this._usersService.getUsers(actionValue.pageIndex, actionValue.pageSize)
        .pipe(
          tap(response => {
            this._store.update(state => ({
              ...state,
              status: 'loaded',
              data: response.data,
              totalUsers: response.total,
              currentPage: actionValue.pageIndex,
              totalPages: Math.ceil(response.total / actionValue.pageSize),
              pageSize: actionValue.pageSize,
              error: undefined,
            }));
          })
        )
    })
  );

  private deleteUserEffect$ = this._usersPageActions.deleteUserAction$.pipe(
    switchMap(action => {
      const state = this._store.getValue();
      const actionValue = action(state);
      this._store.update(state => ({
        ...state,
        deleteInProgress: true
      }))
      return this._usersService.deleteUser(actionValue.user.id)
        .pipe(
          tap(() => {
            this._store.update(state => ({
              ...state,
              deleteInProgress: true
            }));
            actionValue.onSuccess();
          })
        )
    })
  )

  private createUserEffect$ = this._usersPageActions.createUserAction$.pipe(
    switchMap(action => {
      const state = this._store.getValue();
      const actionValue = action(state);
      this._store.update(state => ({
        ...state,
        createInProgress: true
      }))
      return this._usersService.createUser(actionValue.dto)
        .pipe(
          tap(() => {
            this._store.update(state => ({
              ...state,
              createInProgress: true
            }));
            actionValue.onSuccess();
          })
        )
    })
  )

  private updateUserEffect$ = this._usersPageActions.updateUserAction$.pipe(
    switchMap(action => {
      const state = this._store.getValue();
      const actionValue = action(state);
      this._store.update(state => ({
        ...state,
        updateInProgress: true
      }))
      return this._usersService.updateUser(actionValue.dto)
        .pipe(
          tap(() => {
            this._store.update(state => ({
              ...state,
              updateInProgress: true
            }));
            actionValue.onSuccess();
          })
        )
    })
  )

  constructor() {
    // initialize effects
    this.loadDataEffect$.subscribe();
    this.deleteUserEffect$.subscribe();
    this.createUserEffect$.subscribe();
    this.updateUserEffect$.subscribe();
  }

}
