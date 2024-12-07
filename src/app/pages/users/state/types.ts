import {CreateUserDto} from '../../../models/create-user.dto';
import {UpdateUserDto} from '../../../models/update-user.dto';
import {UserDto} from '../../../models/user-dto';

export interface UsersPageState {
  status: 'loading' | 'error' | 'loaded';
  data: UserDto[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  deleteInProgress: boolean;
  createInProgress: boolean;
  updateInProgress: boolean;
  error?: string;
}

export type LoadDataAction = (state: UsersPageState) => ({
  pageIndex: number,
  pageSize: number
});

export type DeleteUserAction = (state: UsersPageState) => ({
  user: UserDto,
  onSuccess: () => void,
});

export type CreateUserAction = (state: UsersPageState) => ({
  dto: CreateUserDto,
  onSuccess: () => void,
})

export type UpdateUserAction = (state: UsersPageState) => ({
  dto: UpdateUserDto,
  onSuccess: () => void,
})
