import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider} from '@angular/fire/auth'
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = {
   email: ''
  }

  constructor(private fireauth: AngularFireAuth) { }

  getCurrentUser(): any {
    let lsData = localStorage.getItem('userInfo');    
    if (lsData !== null) {
      const userData = JSON.parse(lsData);   
      return userData;
    }
  }

  async login(email: string, password: string) {
    const res = await this.fireauth.signInWithEmailAndPassword(email, password);
    if (res.user?.uid && res.user?.email) {
      this.setUserData(res.user?.email);
    }
    return res;
  }

  async register(email: string, password:string) {
    const res = await this.fireauth.createUserWithEmailAndPassword(email, password);
    if (res.user?.uid && res.user?.email) {
      this.setUserData(res.user?.email);
    }
    return res;    
  }

  async logout(): Promise<void> {
    await this.fireauth.signOut();
    localStorage.removeItem('userInfo');
  }

  async googleSignIn() {
    const res = await this.fireauth.signInWithPopup(new GoogleAuthProvider);
    if (res.user?.uid && res.user?.displayName) {
      this.setUserData(res.user?.displayName);
    }
    return res;    
  }

  async signInFacebook() {
    const res = await this.fireauth.signInWithPopup(new FacebookAuthProvider);
    if (res.user?.uid && res.user?.displayName) {
      this.setUserData(res.user?.displayName);
    }
    return res;
  }

  async signInGithub() {
    const res = await this.fireauth.signInWithPopup(new GithubAuthProvider);
    if (res.user?.uid && res.user?.displayName) {
      this.setUserData(res.user?.displayName);
    }
    return res;
  }

  checkUserStatus(): boolean {
    if (localStorage.getItem('userInfo')) {
      return true;
    }
    return false;    
  }

  setUserData(email: string): void {
    this.user.email = email;
    localStorage.setItem('userInfo', JSON.stringify(this.user));
  }

  handleError(err: any): string { 
    let errorCode = err.code;
    switch (errorCode) {
      case 'auth/wrong-password':
        return 'The password is invalid';
      case 'auth/user-not-found':
        return 'The user with this email was not found.';
      case 'auth/too-many-requests':
        return 'Access to this account has been temporarily disabled due to many failed login attempts.';
      case 'auth/email-already-in-use':
        return 'The email address is already in use by another account';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with the same email address';
      case 'auth/popup-closed-by-user':        
        return '';  
      default:
        return `Unknown error: ${errorCode}`;  
    }
  }
}