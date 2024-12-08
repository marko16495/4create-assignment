import {Dialog} from '@angular/cdk/dialog';
import {AsyncPipe} from '@angular/common';
import {Component, inject, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {map, filter, take, shareReplay, combineLatestWith} from 'rxjs';
import {ButtonComponent} from '../../../../design-system/button/button.component';
import {PaginatorComponent, PaginatorValue} from '../../../../design-system/paginator/paginator.component';
import {SnackbarService} from '../../../../design-system/snackbar/snackbar.service';
import {SpinnerComponent} from '../../../../design-system/spinner/spinner.component';
import {TableCellDirective} from '../../../../design-system/table/table-cell.directive';
import {TableColumns} from '../../../../design-system/table/table-column';
import {TableHeaderCellDirective} from '../../../../design-system/table/table-header-cell.directive';
import {TableComponent} from '../../../../design-system/table/table.component';
import {UserCreateDialogComponent} from '../../../components/dialogs/user-create-dialog/user-create-dialog.component';
import {UserEditDialogComponent} from '../../../components/dialogs/user-edit-dialog/user-edit-dialog.component';
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
    AsyncPipe,
    SpinnerComponent,
    TableComponent,
    TableHeaderCellDirective,
    TableCellDirective,
    PaginatorComponent,
    ButtonComponent,
  ],
  providers: [
    UsersPageStore,
    UsersPageActions,
    UsersPageSelectors,
    UsersPageEffects,
    SnackbarService,
  ]
})
export class UsersPageComponent implements OnInit, OnDestroy {

  tableColumns: TableColumns = [
    {id: 'id', label: 'Id', width: '15%'},
    {id: 'name', label: 'Name', width: '50%'},
    {id: 'active', label: 'Active', width: '20%'},
    {id: 'actions'},
  ];

  private _usersPageStore = inject(UsersPageStore);
  private _usersPageActions = inject(UsersPageActions);
  private _usersPageSelectors = inject(UsersPageSelectors);
  private _usersPageEffects = inject(UsersPageEffects);

  private _snackbarService = inject(SnackbarService);

  isLoading$ = this._usersPageSelectors.isLoading$;
  users$ = this._usersPageSelectors.users$;
  totalUsers$ = this._usersPageSelectors.totalUsers$;

  firstLoadCompleted$ = this.isLoading$.pipe(
    filter(isLoading => !isLoading),
    map(() => true),
    take(1),
    shareReplay(1),
  )

  createButtonEnabled$ = this.users$.pipe(
    combineLatestWith(this.totalUsers$),
    map(([users, totalUsers]) => {
      return totalUsers < 5 && users.every(u => u.active)
    })
  )

  deleteInProgress$ = this._usersPageSelectors.deleteInProgress$;
  createInProgress$ = this._usersPageSelectors.createInProgress$;
  updateInProgress$ = this._usersPageSelectors.updateInProgress$;

  loaderVisible$ = this.isLoading$.pipe(
    combineLatestWith(this.deleteInProgress$, this.createInProgress$, this.updateInProgress$),
    map(values => values.some(v => v))
  )

  @ViewChild(PaginatorComponent) paginatorComponent?: PaginatorComponent;

  constructor(private _dialog: Dialog) {}

  ngOnInit() {
    this.loadData(0, 10);
  }

  ngOnDestroy() {
    this._usersPageEffects.unregisterEffects();
  }

  loadData(pageIndex: number, pageSize: number): void {
    this._usersPageActions.loadUsersAction$.next({
      pageIndex: pageIndex,
      pageSize: pageSize
    });
  }

  deleteUser(user: UserDto): void {
    const state = this._usersPageStore.getState();
    this._usersPageActions.deleteUserAction$.next({
      user: user,
      onSuccess: () => {
        this._snackbarService.info('User deleted');
        if (!state.hasNextPage && state.data.length === 1 && state.totalPages > 1) {
          this.paginatorComponent?.previous();
        } else {
          this.reloadData();
        }
      }
    })
  }

  deleteAllUsersOnPage(): void {
    const state = this._usersPageStore.getState();
    this._usersPageActions.deleteMultipleUsersAction$.next({
      users: state.data,
      onSuccess: () => {
        this._snackbarService.info('All users deleted');
        if (state.hasNextPage || state.pageIndex === 0) {
          this.reloadData();
        } else {
          this.paginatorComponent?.previous();
        }
      }
    })
  }

  openCreateDialog() {
    const dialogRef = this._dialog.open(UserCreateDialogComponent, {
      width: '350px',
      autoFocus: false,
    });
    dialogRef.componentInstance!.submit$.subscribe(dto => {
      dialogRef.close();
      this.createUser(dto);
    });
  }

  createUser(user: CreateUserDto): void {
    this._usersPageActions.createUserAction$.next({
      createUserDto: user,
      onSuccess: () => {
        this._snackbarService.info('User created')
        this.reloadData();
      }
    })
  }

  openEditDialog(user: UserDto) {
    const dialogRef = this._dialog.open(UserEditDialogComponent, {
      width: '350px',
      data: user,
      autoFocus: false,
    });
    dialogRef.componentInstance!.submit$.subscribe(dto => {
      dialogRef.close();
      this.updateUser(dto);
    });
  }

  updateUser(updateUserDto: UpdateUserDto): void {
    this._usersPageActions.updateUserAction$.next({
      updateUserDto: updateUserDto,
      onSuccess: () => {
        this._snackbarService.info('User updated')
        this.reloadData();
      }
    })
  }

  reloadData(): void {
    const state = this._usersPageStore.getState();
    this._usersPageActions.loadUsersAction$.next({
      pageIndex: state.pageIndex,
      pageSize: state.pageSize
    });
  }

  onPageChange($event: PaginatorValue) {
    this._usersPageActions.loadUsersAction$.next({
      pageIndex: $event.index - 1,
      pageSize: $event.size,
    });
  }

}
