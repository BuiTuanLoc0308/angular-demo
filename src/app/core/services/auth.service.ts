import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { api_endpoint } from '../constants/api-endpoint';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: LoginResponse): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(api_endpoint.auth.login, data);
  }
}
