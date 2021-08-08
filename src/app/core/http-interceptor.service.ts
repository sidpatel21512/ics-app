import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class HttpInterceptorService {

  private username: string;
  constructor(private auth: AuthService) {
    this.username = this.auth.username ?? '';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newUrl = `${environment.apiUrl}${req.url}`;
    let newHeaders = req.headers;
    newHeaders = newHeaders
      .append('Access-Control-Allow-Origin', '*')
      .append('username', this.username);

    // Finally we have to clone our request with our new headers
    // This is required because HttpRequests are immutable
    const newReq = req.clone({ headers: newHeaders, url: newUrl });
    // Then we return an Observable that will run the request
    // or pass it to the next interceptor if any
    return next.handle(newReq);
  }
}
