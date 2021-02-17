import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | Observable<boolean | UrlTree> {
    return this.authorizationService.user.pipe(map(user => {
      const isAuth = !!user;
      // if(isAuth && (this.router.url === '/login' || this.router.url === '/register')) {
      //   return this.router.createUrlTree(['/getting-started'])
      // }
      if(!isAuth) {
        return this.router.createUrlTree(['/login'])
      }
      return isAuth;
    }));
  }
}
