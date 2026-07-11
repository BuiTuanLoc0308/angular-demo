import { Routes } from '@angular/router';
import { AuthLogin } from './pages/auth-login/auth-login';
import { AuthRegister } from './pages/auth-register/auth-register';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: AuthLogin,
  },
  {
    path: 'register',
    component: AuthRegister,
  },
];
