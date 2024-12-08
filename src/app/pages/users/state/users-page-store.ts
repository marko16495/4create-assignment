import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UsersPageState, UsersPageStatus} from './types';

@Injectable()
export class UsersPageStore {

  private readonly _store$ = new BehaviorSubject<UsersPageState>(this._createInitialState());

  constructor() {
    console.log(this._store$)
  }

  public update(reducer: (currentState: UsersPageState) => UsersPageState) {
    this._store$.next(reducer(this._store$.value));
  }

  public getState(): UsersPageState {
    return this._store$.value;
  }

  public getStore() {
    return this._store$;
  }

  private _createInitialState(): UsersPageState {
    return {
      status: UsersPageStatus.LOADING,
      pageSize: 10,
      pageIndex: 0,
      data: [],
      totalPages: 0,
      hasNextPage: false,
      totalUsers: 0,
      deleteInProgress: false,
      createInProgress: false,
      updateInProgress: false,
    };
  }

}
