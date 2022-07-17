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
  isLoading: boolean = false;
  
  constructor(public authService: AuthService, private router: Router) { } 
  
  register(){
    this.isLoading = true;
    this.authService.register(this.userEmail, this.userPassword).then(() => {
      this.router.navigate(['/home']);                  
    }, err => {
      this.errorMessage = this.authService.handleError(err);
      this.isLoading = false;    
    });
  }
  
  signInWithGoogle() {
    this.isLoading = true;
    this.authService.googleSignIn().then(() => {
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = this.authService.handleError(err);
      this.isLoading = false;
    });    
  }

  signInWithFacebook() {
    this.isLoading = true;
    this.authService.signInFacebook().then(() => {
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = this.authService.handleError(err);
      this.isLoading = false;
    });    
  }

  signInWithGithub() {
    this.isLoading = true;
    this.authService.signInGithub().then(() => {
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = this.authService.handleError(err);
      this.isLoading = false;
    });    
  }
}
