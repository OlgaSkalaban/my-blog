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
    const url: string = state.url;
    return this.checkLogin(url);
  } 
  
  checkLogin(url: string): boolean|UrlTree {
    if (!this.auth.user.isLoggedIn) { 
      return true;
    } else return this.router.parseUrl('/home');
  }

  // guardUser = this.auth.user;

  // canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | boolean {    
  //   if (this.guardUser.isLoggedIn) { 
  //     return false;
  //   } else return true;
  // }  
} 
