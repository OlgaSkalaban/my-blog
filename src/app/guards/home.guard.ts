import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor( private auth: AuthService, private router: Router ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  } 
  
  checkLogin(url: string): boolean|UrlTree {
    if (this.auth.user.isLoggedIn) { return true; }
    alert('You are not an authorized user. Please, log in!');
    //this.auth.redirectUrl = url;
    return this.router.parseUrl('/login');
  }
}
