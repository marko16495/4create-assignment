import {Dialog} from '@angular/cdk/dialog';
import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {map} from 'rxjs';
import {ButtonComponent} from '../../design-system/button/button.component';
import {SnackbarService} from '../../design-system/snackbar/snackbar.service';
import {TableCellDirective} from '../../design-system/table/table-cell.directive';
import {TableColumns} from '../../design-system/table/table-column';
import {TableComponent} from '../../design-system/table/table.component';
import {UserCreateDialogComponent} from '../components/user-create-dialog/user-create-dialog.component';
import {UsersStore} from '../state/users-store';

@Component({
  selector: 'app-users',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  imports: [
    AsyncPipe,
    TableComponent,
    TableCellDirective,
    ButtonComponent,
  ],
  providers: [
    SnackbarService,
  ]
})
export class UsersPageComponent {

  private _usersStore = inject(UsersStore);
  private _snackbarService = inject(SnackbarService);
  private _dialog = inject(Dialog);

  tableColumns: TableColumns = [
    {id: 'id', label: 'Id'},
    {id: 'name', label: 'Name'},
    {id: 'active', label: 'Active'},
  ];

  users$ = this._usersStore.users$;

  createButtonEnabled$ = this.users$.pipe(
    map(users => users.length < 5 && users.every(u => u.active))
  )

  openCreateDialog() {
    const dialogRef = this._dialog.open(UserCreateDialogComponent, {
      panelClass: 'app-user-create-dialog-panel',
    });
    dialogRef.componentInstance!.submit$.subscribe(userDto => {
      dialogRef.close();
      this._snackbarService.info('User created');
      this._usersStore.createUser(userDto);
    });
  }

}
