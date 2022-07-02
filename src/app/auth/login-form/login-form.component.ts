import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  userEmail: string = '';
  userPassword: string = ''; 
  errorMessage: string = '';
  isError = false;    

  constructor(public auth: AuthService, private router: Router) { }

  login(): void{
    this.auth.login(this.userEmail, this.userPassword).then(()=> {
      this.router.navigate(['home']);
    }, err => {      
      this.isError = true;     
      this.errorMessage = err.message;
      this.router.navigate(['/login'])
    });
  }  

  signInWithGoogle() {
    this.auth.googleSignIn().then(() => {
      this.router.navigate(['/home']);
    }, err => {
      this.isError = true;
      this.errorMessage = err.message;
    });    
  }

  signInWithFacebook() {
    this.auth.signInFacebook().then(() => {
      this.router.navigate(['/home']);
    }, err => {
      this.isError = true;
      this.errorMessage = err.message;
    });    
  }

  signInWithGithub() {
    this.auth.signInGithub().then(() => {
      this.router.navigate(['/home']);
    }, err => {
      this.isError = true;
      this.errorMessage = err.message;
    });    
  }
}
