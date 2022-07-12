import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider} from '@angular/fire/auth'
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = {
    id: '',
    name: '',
    isLoggedIn: false
  }

  constructor(private fireauth: AngularFireAuth) { }

  getCurrentUser(): any {
    let lsData = localStorage.getItem('userInfo');    
    if (lsData !== null) {
      const userData = JSON.parse(lsData);   
      return userData;
    }
  }

  async login(email: string, password: string): Promise<void> {
    const res = await this.fireauth.signInWithEmailAndPassword(email, password);
    if (res.user?.uid && res.user?.email) {
      this.setUserData(res.user?.uid, res.user?.email, true);
    }
  }

  async register(email: string, password:string): Promise<void> {
    const res = await this.fireauth.createUserWithEmailAndPassword(email, password);
    if (res.user?.uid && res.user?.email) {
      this.setUserData(res.user?.uid, res.user?.email, true);
    }    
  }

  async logout(): Promise<void> {
    await this.fireauth.signOut();
    localStorage.removeItem('userInfo');
  }

  async googleSignIn(): Promise<void> {
    const res = await this.fireauth.signInWithPopup(new GoogleAuthProvider);
    if (res.user?.uid && res.user?.displayName) {
      this.setUserData(res.user?.uid, res.user?.displayName, true);
    }    
  }

  async signInFacebook(): Promise<void> {
    const res = await this.fireauth.signInWithPopup(new FacebookAuthProvider);
    if (res.user?.uid && res.user?.displayName) {
      this.setUserData(res.user?.uid, res.user?.displayName, true);
    }
  }

  async signInGithub(): Promise<void> {
    const res = await this.fireauth.signInWithPopup(new GithubAuthProvider);
    if (res.user?.uid && res.user?.displayName) {
      this.setUserData(res.user?.uid, res.user?.displayName, true);
    }
  }

  checkUserStatus(): boolean {
    if (localStorage.getItem('userInfo')) {
      return true;
    }
    return false;    
  }

  setUserData(id: string, name: string, login: boolean): void {
    this.user.id = id;
    this.user.name = name;
    this.user.isLoggedIn = login;
    localStorage.setItem('userInfo', JSON.stringify(this.user));
  }
}