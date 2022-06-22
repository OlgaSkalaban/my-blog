import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then( () => {
      localStorage.setItem('token', 'true');
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
      this.router.navigate(['/login']);
    }, err => {
      alert('smth wrong...');
    })
  }

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigate(['/home']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    })
  }

  signInFacebook() {
    return this.fireauth.signInWithPopup(new FacebookAuthProvider).then(res => {
      this.router.navigate(['/home']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    })
  }

  signInGithub() {
    return this.fireauth.signInWithPopup(new GithubAuthProvider).then(res => {
      this.router.navigate(['/home']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    })
  }
}