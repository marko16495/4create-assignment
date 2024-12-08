import {Injectable} from '@angular/core';
import {Observable, timer, map} from 'rxjs';
import {CreateUserDto} from '../models/create-user.dto';
import {PaginatedResponseDto} from '../models/paginated-response.dto';
import {UpdateUserDto} from '../models/update-user.dto';
import {UserDto} from '../models/user-dto';

const initialUsers: CreateUserDto[] = [
  {name: 'Madilyn Day', active: true},
  {name: 'Kayson Marin', active: false},
  {name: 'Celia Poole', active: true},
  {name: 'Quincy Keith', active: true},
  {name: 'Elyse McCullough', active: true},
  {name: 'Briar Fuller', active: true},
  {name: 'Oakley Jordan', active: false},
  {name: 'Sawyer Church', active: false},
  {name: 'Ayleen Stout', active: false},
  {name: 'Callahan Quintana', active: true},
  {name: 'Kenia Turner', active: true},
  {name: 'Joshua Pace', active: false},
  {name: 'Giana Yang', active: true},
  {name: 'Malcolm Case', active: false},
  {name: 'Cleo Barr', active: true},
  {name: 'Harley Rowland', active: true},
  {name: 'Harleigh Stafford', active: true},
  {name: 'Alfredo Alfaro', active: true},
  {name: 'Yasmin Horton', active: true},
  {name: 'Garrett Galindo', active: false},
  {name: 'Corinne Fuentes', active: true},
  {name: 'Bowen Alvarez', active: true},
  {name: 'Leilani Skinner', active: true},
  {name: 'Ridge Dominguez', active: true},
]

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _users: UserDto[] = [];
  private _nextId = 1;

  constructor() {
    initialUsers.forEach(dto => this._createUser(dto))
  }

  public createUser(createUserDto: CreateUserDto): Observable<void> {
    return this._randomTimer().pipe(
      map(() => this._createUser(createUserDto)),
    );
  }

  public updateUser(updateUserDto: UpdateUserDto): Observable<void> {
    return this._randomTimer().pipe(
      map(() => this._updateUser(updateUserDto)),
    );
  }

  public deleteUser(userId: number): Observable<void> {
    return this._randomTimer().pipe(
      map(() => this._deleteUser(userId)),
    );
  }

  public deleteMultipleUsers(users: UserDto[]): Observable<void> {
    return this._randomTimer().pipe(
      map(() => this._deleteMultipleUsers(users)),
    );
  }

  public isNameTakenByAnotherUser(name: string, userId: number | null): Observable<boolean> {
    return this._randomTimer().pipe(
      map(() => this._isNameTakenByAnotherUser(name, userId)),
    );
  }

  public getUsers(pageIndex: number, pageSize: number): Observable<PaginatedResponseDto<UserDto>> {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const data = this._users
      .sort((a, b) => b.id - a.id)
      .slice(startIndex, endIndex);
    const response: PaginatedResponseDto<UserDto> = {
      total: this._users.length,
      data: data
    }
    return this._randomTimer().pipe(
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

  private _deleteMultipleUsers(users: UserDto[]): void {
    for (const user of users) {
      this._deleteUser(user.id);
    }
  }

  private _isNameTakenByAnotherUser(name: string, userId: number | null): boolean {
    const user = this._users.find(user => user.name === name);
    return !!user && user.id !== userId;
  }

  private _randomTimer(): Observable<0> {
    const duration = 300 + Math.random() * 100;
    return timer(duration)
  }

}
