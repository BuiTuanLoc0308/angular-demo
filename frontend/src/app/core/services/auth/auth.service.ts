import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TokenService } from './token.service';
import { LoginRequest } from '../../models/auth/login-request.model';
import { LoginResponse } from '../../models/auth/login-response.model';
import { api_endpoint } from '../../constants/api-endpoint';
import { RegisterRequest } from '../../models/auth/register-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  login(data: LoginRequest) {
    return this.http
      .post<LoginResponse>(api_endpoint.auth.login, data)
      .pipe(tap((res) => this.tokenService.setToken(res.accessToken)));
  }

  register(data: RegisterRequest) {
    return this.http.post(api_endpoint.auth.register, data);
  }

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }
}
