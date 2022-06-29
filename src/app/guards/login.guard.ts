import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor (private auth: AuthService, private router: Router) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree {
    //return this.checkLogin();
    if (localStorage.getItem('token')) {
      console.log('пользователь авторизован');
      return this.router.parseUrl('/home');      
    }
    return true;
  } 
  
  // checkLogin(): boolean|UrlTree {
  //   if (localStorage.getItem('token')) {
  //     console.log('пользователь авторизован');
  //     return this.router.parseUrl('/home');      
  //   }
  //   return true;
  // }  
} 
