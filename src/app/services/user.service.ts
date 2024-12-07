import {Injectable} from '@angular/core';
import {Observable, timer, map} from 'rxjs';
import {CreateUserDto} from '../models/create-user.dto';
import {PaginatedResponseDto} from '../models/paginated-response.dto';
import {UpdateUserDto} from '../models/update-user.dto';
import {UserDto} from '../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _users: UserDto[] = [];
  private _nextId = 1;

  constructor() {
    this._createUser({name: 'Marko Vujović', active: true});
    this._createUser({name: 'Peter Parker', active: false});
    this._createUser({name: 'Bruce Wayne', active: false});
  }

  public createUser(createUserDto: CreateUserDto): Observable<void> {
    return timer(100).pipe(
      map(() => this._createUser(createUserDto)),
    );
  }

  public updateUser(updateUserDto: UpdateUserDto): Observable<void> {
    return timer(100).pipe(
      map(() => this._updateUser(updateUserDto)),
    );
  }

  public deleteUser(userId: number): Observable<void> {
    return timer(100).pipe(
      map(() => this._deleteUser(userId)),
    );
  }

  public isNameTaken(name: string): Observable<boolean> {
    return timer(100).pipe(
      map(() => this._isNameTaken(name)),
    );
  }

  public getUsers(pageIndex: number, pageSize: number): Observable<PaginatedResponseDto<UserDto>> {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const data = this._users.slice(startIndex, endIndex);
    const response: PaginatedResponseDto<UserDto> = {
      total: this._users.length,
      data: data
    }
    return timer(100).pipe(
      map(() => response)
    );
  }

  private _createUser(createUserDto: CreateUserDto): void {
    this._users.push({
      id: this._nextId,
      name: createUserDto.name,
      active: createUserDto.active
    });
    this._nextId++;
  }

  private _updateUser(updateUserDto: UpdateUserDto): void {
    const user = this._users.find(user => user.id === updateUserDto.id);
    if (!user) {
      return
    }
    user.name = updateUserDto.name;
    user.active = updateUserDto.active;
  }

  private _deleteUser(id: number): void {
    const index = this._users.findIndex(user => user.id === id);
    if (index === -1) {
      return
    }
    this._users.splice(index, 1);
  }

  private _isNameTaken(name: string): boolean {
    const user = this._users.find(user => user.name === name);
    return !!user;
  }

}
