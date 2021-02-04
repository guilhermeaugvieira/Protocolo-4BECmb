import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../UserService/user.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    requisicao: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.userService.getToken();

    requisicao = requisicao.clone({
      headers: requisicao.headers.set('Authorization', `Bearer ${authToken}`),
    });

    return next.handle(requisicao);
  }
}
