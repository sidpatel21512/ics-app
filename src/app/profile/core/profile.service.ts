import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProfile, Methods } from 'src/app/app.constant';
import { AuthService } from 'src/app/core/auth.service';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public getProfileDetails(): Observable<IProfile> {
    return this.http.get<IProfile>(`${Methods.Users}/${this.auth.currentUserId}`).pipe(
      map(res => res)
    );
  }

  public updateProfile(body: IProfile): Observable<any> {
    return this.http.put(`${Methods.Users}/${this.auth.currentUserId}`, body);
  }
}
