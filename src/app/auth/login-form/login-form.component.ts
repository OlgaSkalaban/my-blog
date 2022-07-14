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
  isLoggedIn: boolean = false;
  isLoading: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  login(): void {
    this.isLoading = !this.isLoading
    this.authService.login(this.userEmail, this.userPassword)
      .then(()=> {
        this.isLoggedIn = true;
        this.router.navigate(['home']);
      }, err => {
        this.isLoading = !this.isLoading
        this.errorMessage = this.authService.handleError(err);
      });
  }  

  signInWithGoogle() {
    this.isLoading = !this.isLoading
    this.authService.googleSignIn().then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      this.isLoading = !this.isLoading
      this.errorMessage = this.authService.handleError(err);
    });    
  }

  signInWithFacebook() {
    this.isLoading = !this.isLoading
    this.authService.signInFacebook().then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      this.isLoading = !this.isLoading
      this.errorMessage = this.authService.handleError(err);
    });    
  }

  signInWithGithub() {
    this.isLoading = !this.isLoading
    this.authService.signInGithub().then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      this.isLoading = !this.isLoading
      this.errorMessage = this.authService.handleError(err);
    });    
  }
}
