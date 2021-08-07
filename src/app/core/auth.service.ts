import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { apiUrl, IAccount, ROLE } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private session_key = 'session';
  private current_user_key = 'currentuser';
  private role_key = 'role';
  constructor(private http: HttpClient) {
  }

  public verifyLogin(username: string, password: string): Observable<boolean> {
    return this.http.get<IAccount[]>(`${apiUrl}/accounts?username=${username}&passwrod=${password}`).pipe(
      tap(res => {
        if (res[0]) {
          this.role = res[0].role;
          this.currentUserId = res[0].userId.toString();
          this.session = 'true';
        }
      }),
      map(res => res.length ? true : false)
    );
  }

  public get session(): any {
    return localStorage.getItem(this.session_key);
  }

  public set session(value: string) {
    localStorage.setItem(this.session_key, value);
  }

  public get currentUserId(): any {
    return localStorage.getItem(this.current_user_key);
  }

  public set currentUserId(value: string) {
    localStorage.setItem(this.current_user_key, value);
  }

  public get role(): any {
    return localStorage.getItem(this.role_key);
  }

  public set role(value: string) {
    localStorage.setItem(this.role_key, value);
  }

  public clearStorage(): void {
    localStorage.setItem(this.session_key, '');
    localStorage.setItem(this.current_user_key, '');
    localStorage.setItem(this.role_key, '');
  }
}
