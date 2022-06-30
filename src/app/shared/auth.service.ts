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

  errorMessage: string = '';
  isError = false;

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  getCurrentUser() {    
    const userJ = localStorage.getItem('token');
    if (userJ !== null) {
      const userObj = JSON.parse(userJ);
      return userObj;
    }
  }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      this.setUserData(JSON.stringify(res.user?.uid), JSON.stringify(res.user?.email));
      this.user.isLoggedIn = true;    
      this.router.navigate(['home']);
    }, err => {
      this.isError = true;
      this.errorMessage = err.message;
      this.router.navigate(['/login'])
    })
  }

  register(email: string, password:string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( () => {
      alert('Registration succesful');
      this.router.navigate(['/login']);
    }, err => {
      this.isError = true;
      this.errorMessage = err.message;
      this.router.navigate(['/signup'])
    })
  }

  logout() {
    this.fireauth.signOut().then( ()=> {
      localStorage.removeItem('token');
      this.user.isLoggedIn = false;
      this.router.navigate(['/login']);
    }, err => {
      this.isError = true;
      this.errorMessage = err.message;
    })
  }

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.user.isLoggedIn = true;
      console.log(this.user.isLoggedIn);
      this.router.navigate(['/home']);
      this.setUserData(JSON.stringify(res.user?.uid), JSON.stringify(res.user?.displayName));
    }, err => {
      this.isError = true;
      this.errorMessage = err.message;
    })
  }

  signInFacebook() {
    return this.fireauth.signInWithPopup(new FacebookAuthProvider).then(res => {
      this.user.isLoggedIn = true;
      this.router.navigate(['/home']);
      this.setUserData(JSON.stringify(res.user?.uid), JSON.stringify(res.user?.displayName)); 
    }, err => {
      this.isError = true;
      this.errorMessage = err.message;
    })
  }

  signInGithub() {
    return this.fireauth.signInWithPopup(new GithubAuthProvider).then(res => {
      this.user.isLoggedIn = true;
      this.router.navigate(['/home']);
      this.setUserData(JSON.stringify(res.user?.uid), JSON.stringify(res.user?.displayName)); 
    }, err => {
      this.isError = true;
      this.errorMessage = err.message;
    })
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