import {Injectable, inject} from '@angular/core';
import {select} from '@ngneat/elf';
import {UsersPageStore} from './users-page-store';

@Injectable()
export class UsersPageSelectors {

  private _usersPageStore = inject(UsersPageStore);

  private _store = this._usersPageStore.getStore();

  isLoading$ = this._store.pipe(select(state => state.status === 'loading'));
  users$ = this._store.pipe(select(state => state.data));
  totalUsers$ = this._store.pipe(select(state => state.totalUsers));
  totalPages$ = this._store.pipe(select(state => state.totalPages));
  currentPage$ = this._store.pipe(select(state => state.currentPage));
  pageSize$ = this._store.pipe(select(state => state.pageSize));
  hasNextPage$ = this._store.pipe(select(state => state.currentPage + 1 < state.totalPages));
  hasPreviousPage$ = this._store.pipe(select(state => state.currentPage > 0));
  deleteInProgress$ = this._store.pipe(select(state => state.deleteInProgress));
  createInProgress$ = this._store.pipe(select(state => state.createInProgress));
  updateInProgress$ = this._store.pipe(select(state => state.updateInProgress));

}
