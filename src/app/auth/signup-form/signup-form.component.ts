import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  userEmail: string = '';
  userPassword: string = '';
  errorMessage: string = '';
  isError = false;
  isRegister = false;  

  constructor(public auth: AuthService, private router: Router) { }  

  register(){
    this.auth.register(this.userEmail, this.userPassword).then(() => {
      this.isError = false;
      this.isRegister = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000);      
    }, err => {
      this.isError = true;
      this.errorMessage = err.message;      
    });
    // this.userEmail = '';
    // this.userPassword = '';
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
