import {Injectable} from '@angular/core';
import {createStore, withProps, Store, StoreConfig} from '@ngneat/elf';
import {UsersPageState} from './types';

@Injectable()
export class UsersPageStore {

  private readonly _store: Store<{name: string, state: UsersPageState, config: any}>;

  public getStore() {
    return this._store;
  }

  constructor() {
    // initialize store
    const storeConfig: StoreConfig = {
      name: 'UsersPageStore'
    }
    this._store = createStore(
      storeConfig,
      withProps<UsersPageState>(this._createInitialState())
    );
  }

  private _createInitialState(): UsersPageState {
    return {
      status: 'loading',
      pageSize: 10,
      currentPage: 0,
      totalPages: 1,
      data: [],
      totalUsers: 0,
      deleteInProgress: false,
      createInProgress: false,
      updateInProgress: false,
    };
  }

}
