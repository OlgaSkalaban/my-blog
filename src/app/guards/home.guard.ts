import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor( private auth: AuthService, private router: Router ) {}

  authUser = this.auth.user;

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  } 
  
  checkLogin(url: string): boolean|UrlTree {
    //console.log('Статус юзера:', this.authUser.isLoggedIn);
    if (localStorage.getItem('token')) {
      //console.log('пользователь существует и авторизован');
      return true;
    }
    
    alert('You are not an authorized user. Please, log in!');
    this.auth.redirectUrl = url;
    return this.router.parseUrl('/login');
  }
}
