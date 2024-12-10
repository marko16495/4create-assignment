import {Injectable} from '@angular/core';
import {createStore} from '@ngneat/elf';
import {
  withEntities,
  setEntities,
  selectAllEntities,
  addEntities,
  selectEntityByPredicate,
  updateEntities
} from '@ngneat/elf-entities';
import {Observable, take, delay} from 'rxjs';
import {CreateUserDto} from '../models/create-user.dto';
import {UserDto} from '../models/user-dto';
import {UserIdGenerator} from '../util/user-id-generator';

@Injectable({
  providedIn: 'root'
})
export class UsersStore {

  private readonly _usersStore = createStore({name: 'usersStore'}, withEntities<UserDto>());

  users$ = this._usersStore.pipe(selectAllEntities());

  constructor() {
    this._usersStore.update(setEntities([
      {id: UserIdGenerator.nextId(), name: 'Madilyn Day', active: true},
      {id: UserIdGenerator.nextId(), name: 'Kayson Marin', active: true},
    ]))
  }

  createUser (user: CreateUserDto) {
    this._usersStore.update(addEntities({
      id: UserIdGenerator.nextId(),
      name: user.name,
      active: user.active
    }))
  }

  findUserByName(name: string): Observable<UserDto | undefined> {
    return this._usersStore.pipe(
      selectEntityByPredicate(p => p.name === name),
      take(1),
      delay(1000),
    )
  }

  updateUser(user: UserDto) {
    this._usersStore.update(updateEntities(user.id, user));
  }

}
