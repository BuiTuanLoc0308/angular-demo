import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/auth/token.service';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

let isRefreshing = false;

const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthRequest =
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/register') ||
    req.url.includes('/auth/refresh');

  if (isAuthRequest) {
    return next(req);
  }

  const token = tokenService.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(authReq).pipe(
      catchError((error) => {
        if (error.status !== 401) {
          throw error;
        }

        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authService.refreshToken().pipe(
            switchMap((res) => {
              isRefreshing = false;

              refreshTokenSubject.next(res.accessToken);

              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.accessToken}`,
                },
              });

              return next(retryReq);
            }),

            catchError((refreshError) => {
              isRefreshing = false;
              refreshTokenSubject.next(null);

              if (refreshError.status === 401) {
                tokenService.removeToken();
                router.navigate(['/login']);
              }

              return throwError(() => refreshError);
            }),
          );
        }

        return refreshTokenSubject.pipe(
          filter((token): token is string => token !== null),
          take(1),
          switchMap((token) => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });

            return next(retryReq);
          }),
        );
      }),
    );
  }

  return next(req);
};
