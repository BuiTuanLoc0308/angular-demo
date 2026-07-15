import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth-login/auth-login').then((m) => m.AuthLogin),
  },

  {
    path: 'register',
    loadComponent: () => import('./pages/auth-register/auth-register').then((m) => m.AuthRegister),
  },
];
