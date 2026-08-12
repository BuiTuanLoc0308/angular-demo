import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly access_token = 'access_token';

  getToken(): string | null {
    return localStorage.getItem(this.access_token);
  }

  setToken(token: string): void {
    localStorage.setItem(this.access_token, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.access_token);
  }
}
