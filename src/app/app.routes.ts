import { Routes } from '@angular/router';
import { AuthLogin } from './features/auth/pages/auth-login/auth-login';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: AuthLogin,
  },
];
