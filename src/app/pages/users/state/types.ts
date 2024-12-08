import {CreateUserDto} from '../../../models/create-user.dto';
import {UpdateUserDto} from '../../../models/update-user.dto';
import {UserDto} from '../../../models/user-dto';

export enum UsersPageStatus {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
}

export interface UsersPageState {
  status: UsersPageStatus;
  data: UserDto[];
  totalUsers: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
  hasNextPage: boolean;
  deleteInProgress: boolean;
  createInProgress: boolean;
  updateInProgress: boolean;
  error?: string;
}

export type LoadUsersAction = {
  pageIndex: number,
  pageSize: number
}

export type DeleteUserAction = {
  user: UserDto,
  onSuccess: () => void,
}

export type DeleteMultipleUsersAction = {
  users: UserDto[];
  onSuccess: () => void,
}

export type CreateUserAction = {
  createUserDto: CreateUserDto,
  onSuccess: () => void,
}

export type UpdateUserAction = {
  updateUserDto: UpdateUserDto,
  onSuccess: () => void,
}
