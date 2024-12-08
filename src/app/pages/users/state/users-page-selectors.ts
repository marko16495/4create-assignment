import {Injectable, inject} from '@angular/core';
import {map} from 'rxjs';
import {UsersPageStatus} from './types';
import {UsersPageStore} from './users-page-store';

/**
 * Selectors are used for getting parts of the state
 */
@Injectable()
export class UsersPageSelectors {

  private _usersPageStore = inject(UsersPageStore);
  private _store = this._usersPageStore.getStore();

  isLoading$ = this._store.pipe(map(state => state.status === UsersPageStatus.LOADING));
  users$ = this._store.pipe(map(state => state.data));
  totalUsers$ = this._store.pipe(map(state => state.totalUsers));
  deleteInProgress$ = this._store.pipe(map(state => state.deleteInProgress));
  createInProgress$ = this._store.pipe(map(state => state.createInProgress));
  updateInProgress$ = this._store.pipe(map(state => state.updateInProgress));

}
