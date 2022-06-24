import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import {User} from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  user: User = {
    id: '',
    name: ''
  };

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  getCurrentUser() {
    if (localStorage.getItem('token')) {
      const userJ: any = localStorage.getItem('token');
      const userObj = JSON.parse(userJ);
      return userObj.name; 
    }
  }


  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      console.log(JSON.stringify(res));
      this.setUserData(JSON.stringify(res.user?.uid), JSON.stringify(res.user?.email));    
      this.router.navigate(['home']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login'])
    })
  }

  register(email: string, password:string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( () => {
      alert('Registration succesful');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/signup'])
    })
  }

  logout() {
    this.fireauth.signOut().then( ()=> {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }, err => {
      alert('smth wrong...');
    })
  }

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
      this.setUserData(JSON.stringify(res.user?.uid), JSON.stringify(res.user?.displayName));
    }, err => {
      alert(err.message);
    })
  }

  signInFacebook() {
    return this.fireauth.signInWithPopup(new FacebookAuthProvider).then(res => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
      this.setUserData(JSON.stringify(res.user?.uid), JSON.stringify(res.user?.displayName)); 
    }, err => {
      alert(err.message);
    })
  }

  signInGithub() {
    return this.fireauth.signInWithPopup(new GithubAuthProvider).then(res => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
      this.setUserData(JSON.stringify(res.user?.uid), JSON.stringify(res.user?.displayName)); 
    }, err => {
      alert(err.message);
    })
  }

  // getUserName() {
  //   return this.user.name;
  // }

  setUserData(id: any, name: any) {
    this.user.id = JSON.stringify(id);
    this.user.name = JSON.stringify(name);
    localStorage.setItem('token', JSON.stringify(this.user));
  }
}