import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authorizationService: AuthorizationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authorizationService.user.pipe(
      take(1),
      exhaustMap((user: any) => {
        if (user) {
          const modifiedReq = req.clone({
            headers: new HttpHeaders({ 'x-api-token': user.token }),
          });
          return next.handle(modifiedReq);
        }

        return next.handle(req);
      })
    );
  }
}
