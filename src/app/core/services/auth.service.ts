import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { api_endpoint } from '../constants/api-endpoint';
import { LoginRequest } from '../models/login-request.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {}

  login(data: LoginRequest) {
    return this.http
      .post<LoginResponse>(api_endpoint.auth.login, data)
      .pipe(tap((res) => this.tokenService.setToken(res.accessToken)));
  }

  // login(data: LoginRequest): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(api_endpoint.auth.login, data);
  // }
}
