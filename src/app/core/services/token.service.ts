import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'token';

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {

    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {

      const payload = JSON.parse(
        atob(token.split('.')[1]));

      const expiration =
        payload.exp * 1000;

      return expiration > Date.now();

    } catch {

      return false;
    }
  }
}