import {NgForOf, AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {CreateUserDto} from '../../../models/create-user.dto';
import {UpdateUserDto} from '../../../models/update-user.dto';
import {UserDto} from '../../../models/user-dto';
import {UsersPageActions} from '../state/users-page-actions';
import {UsersPageEffects} from '../state/users-page-effects';
import {UsersPageSelectors} from '../state/users-page-selectors';
import {UsersPageStore} from '../state/users-page-store';

@Component({
  selector: 'app-users',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  imports: [
    NgForOf,
    AsyncPipe
  ],
  providers: [
    UsersPageStore,
    UsersPageActions,
    UsersPageSelectors,
    UsersPageEffects,
  ]
})
export class UsersPageComponent {

  private _usersPageStore = inject(UsersPageStore);
  private _usersPageActions = inject(UsersPageActions);
  private _usersPageSelectors = inject(UsersPageSelectors);
  private _usersPageEffects = inject(UsersPageEffects);

  isLoading$ = this._usersPageSelectors.isLoading$;
  users$ = this._usersPageSelectors.users$;
  totalUsers$ = this._usersPageSelectors.totalUsers$;
  currentPage$ = this._usersPageSelectors.currentPage$;
  totalPages$ = this._usersPageSelectors.totalPages$;
  hasNextPage$ = this._usersPageSelectors.hasNextPage$;
  hasPreviousPage$ = this._usersPageSelectors.hasPreviousPage$;
  pageSize$ = this._usersPageSelectors.pageSize$;
  deleteInProgress$ = this._usersPageSelectors.deleteInProgress$;

  constructor() {
    this.loadData(0, 10);
  }

  loadData(pageIndex: number, pageSize: number): void {
    this._usersPageActions.loadDataAction$.next(() => ({
      pageIndex: pageIndex,
      pageSize: pageSize
    }));
  }

  loadNextPage(): void {
    this._usersPageActions.loadDataAction$.next((state) => ({
      pageIndex: state.currentPage + 1,
      pageSize: state.pageSize
    }));
  }

  loadPreviousPage(): void {
    this._usersPageActions.loadDataAction$.next((state) => ({
      pageIndex: state.currentPage - 1,
      pageSize: state.pageSize
    }));
  }

  deleteUser(user: UserDto): void {
    this._usersPageActions.deleteUserAction$.next((state) => ({
      user: user,
      onSuccess: () => {
        console.log('user deleted');
        this.reloadData();
      }
    }))
  }

  createUser(user: CreateUserDto): void {
    this._usersPageActions.createUserAction$.next((state) => ({
      dto: user,
      onSuccess: () => {
        console.log('user created');
        this.reloadData();
      }
    }))
  }

  updateUser(updateUserDto: UpdateUserDto): void {
    this._usersPageActions.updateUserAction$.next((state) => ({
      dto: updateUserDto,
      onSuccess: () => {
        console.log('user updated');
        this.reloadData();
      }
    }))
  }

  reloadData(): void {
    this._usersPageActions.loadDataAction$.next((state) => ({
      pageIndex: state.currentPage,
      pageSize: state.pageSize
    }));
  }

}

