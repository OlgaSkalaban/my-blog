import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  isLoading: boolean = false;
  
  constructor(public authService: AuthService, private router: Router) { } 
  
  register(){
    this.isLoading = true;
    this.authService.register(this.userEmail, this.userPassword).then(() => {
      this.isLoggedIn = true;
      this.isLoading = !this.isLoading;
      this.router.navigate(['/home']);                  
    }, err => {
      this.errorMessage = this.authService.handleError(err);
      this.isLoading = !this.isLoading;    
    });
  }
  
  signInWithGoogle() {
    this.isLoading = !this.isLoading;
    this.authService.googleSignIn().then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = this.authService.handleError(err);
      this.isLoading = !this.isLoading;
    });    
  }

  signInWithFacebook() {
    this.isLoading = !this.isLoading;
    this.authService.signInFacebook().then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = this.authService.handleError(err);
      this.isLoading = !this.isLoading;
    });    
  }

  signInWithGithub() {
    this.isLoading = !this.isLoading;
    this.authService.signInGithub().then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = this.authService.handleError(err);
      this.isLoading = !this.isLoading;
    });    
  }
}
