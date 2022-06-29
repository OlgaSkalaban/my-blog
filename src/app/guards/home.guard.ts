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
    //return this.checkLogin();
    if (localStorage.getItem('token')) {      
      return true;
    }    
    alert('You are not an authorized user. Please, log in!');    
    return this.router.parseUrl('/login');
  } 
  
  // checkLogin(): boolean|UrlTree {    
  //   if (localStorage.getItem('token')) {      
  //     return true;
  //   }    
  //   alert('You are not an authorized user. Please, log in!');    
  //   return this.router.parseUrl('/login');
  // }
}
