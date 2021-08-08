import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAccount, IUserDetails, Methods, UserDetails } from 'src/app/app.constant';
import { AuthService } from 'src/app/core/auth.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public getUsers(): Observable<UserDetails[]> {
    return this.http.get<IUserDetails[]>(`${Methods.Users}`).pipe(
      map(res => res.map(r => new UserDetails(r.id, r.username, r.name, r.gender, r.email, r.role)))
    );
  }

  public addNewUser(body: IUserDetails): Observable<any> {
    return this.http.post<IUserDetails>(`${Methods.Users}`, body).pipe(
      map(res => {
        const newAccount = {
          username: res.username,
          password: 'Avengers',
          role: res.role,
          userId: res.id
        } as IAccount;
        this.addNewAccount(newAccount).subscribe();
        return res;
      })
    );
  }

  public addNewAccount(body: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>(`${Methods.Accounts}`, body);
  }

  public updateUserDetails(id: number, body: IUserDetails): Observable<IUserDetails> {
    return this.http.put<IUserDetails>(`${Methods.Users}/${id}`, body).pipe(
      map(res => {
        this.auth.getAccountByUserId(res.id).subscribe((account: IAccount) => {
          const accountBody = {
            username: account.username,
            password: account.password,
            role: body.role,
            userId: account.userId,
            id: account.id
          } as IAccount;
          this.auth.updateAccount(account.id, accountBody).subscribe();
          return res;
        });
        return res;
      })
    );
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete(`${Methods.Users}/${id}`);
  }
}
