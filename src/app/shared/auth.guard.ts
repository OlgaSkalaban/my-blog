import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthService, private router: Router ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true|UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  } 
  
  checkLogin(url: string): true|UrlTree {
    if (this.auth.user.isLoggedIn) { return true; }
    alert('You are not an authorized user. Please, log in!');
    this.auth.redirectUrl = url;
    return this.router.parseUrl('/login');
  }
}
