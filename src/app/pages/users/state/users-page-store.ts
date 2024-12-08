import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UsersPageState, UsersPageStatus} from './types';

/**
 * Store holds the state (data).
 *
 * NOTE: Akita is not maintained anymore, and doesn't work with latest versions of Angular.
 * Because of that, I created custom store implementation that only uses BehaviorSubject from RxJS.
 */
@Injectable()
export class UsersPageStore {

  private readonly _store$ = new BehaviorSubject<UsersPageState>(this._createInitialState());

  constructor() {}

  public update(updateFn: (currentState: UsersPageState) => UsersPageState) {
    this._store$.next(updateFn(this.getState()));
  }

  public getState(): UsersPageState {
    // Return copy of state object to prevent accidental updates
    return structuredClone(this._store$.value);
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
