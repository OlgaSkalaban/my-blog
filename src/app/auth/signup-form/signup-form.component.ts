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
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }  

  register(){
    this.authService.register(this.userEmail, this.userPassword).then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);                  
    }, err => {
      this.errorMessage = this.authService.handleError(err);     
    });
  }
  
  signInWithGoogle() {
    this.authService.googleSignIn().then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = this.authService.handleError(err);
    });    
  }

  signInWithFacebook() {
    this.authService.signInFacebook().then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = this.authService.handleError(err);
    });    
  }

  signInWithGithub() {
    this.authService.signInGithub().then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = this.authService.handleError(err);
    });    
  }
}
