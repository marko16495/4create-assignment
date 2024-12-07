import { Routes } from '@angular/router';
import {UsersPageComponent} from './pages/users-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersPageComponent
  }
];
