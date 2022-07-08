import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  user: User = {
    id: '',
    name: '',
    isLoggedIn: false
  };

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  getCurrentUser() {    
    const userJ = localStorage.getItem('token');
    if (userJ !== null) {
      const userObj = JSON.parse(userJ);
      return userObj;
    }
  }

  async login(email: string, password: string) {
    const res = await this.fireauth.signInWithEmailAndPassword(email, password);
    this.setUserData(JSON.stringify(res.user?.uid), JSON.stringify(res.user?.email));
    this.user.isLoggedIn = true;
  }

  async register(email: string, password:string) {
    return await this.fireauth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.fireauth.signOut();
    localStorage.removeItem('token');
    this.user.isLoggedIn = false;
  }

  async googleSignIn() {
    const res = await this.fireauth.signInWithPopup(new GoogleAuthProvider);
    this.user.isLoggedIn = true;
    this.setUserData(JSON.stringify(res.user?.uid), JSON.stringify(res.user?.displayName));
  }

  async signInFacebook() {
    const res = await this.fireauth.signInWithPopup(new FacebookAuthProvider);
    this.user.isLoggedIn = true;
    this.setUserData(JSON.stringify(res.user?.uid), JSON.stringify(res.user?.displayName));
  }

  async signInGithub() {
    const res = await this.fireauth.signInWithPopup(new GithubAuthProvider);
    this.user.isLoggedIn = true;
    this.setUserData(JSON.stringify(res.user?.uid), JSON.stringify(res.user?.displayName));
  }

  checkUserStatus() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;    
  }

  setUserData(id: string, name: string) {
    this.user.id = JSON.stringify(id);
    this.user.name = JSON.stringify(name);
    localStorage.setItem('token', JSON.stringify(this.user));
  }
}