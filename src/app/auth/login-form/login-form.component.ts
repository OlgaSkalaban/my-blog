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

  constructor(public authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.userEmail, this.userPassword)
      .then(()=> {
        this.isLoggedIn = true;
        this.router.navigate(['home']);
      }, err => {
        let errorCode = err.code;
        switch (errorCode) {
          case 'auth/wrong-password':
            this.errorMessage = 'The password or email is invalid';
            break;
          case 'auth/user-not-found':
            this.errorMessage = 'The user with this email was not found.';
            break;
          case 'auth/too-many-requests':
            this.errorMessage = 'Access to this account has been temporarily disabled due to many failed login attempts.';
            break;
          default:
            console.log('Не тот код ошибки');  
            break;
        }
      });
  }  

  signInWithGoogle() {
    this.authService.googleSignIn().then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      let errorCode = err.code;
      if (errorCode === 'auth/wrong-password') {          
        this.errorMessage = err.message;
      }
      
    });    
  }

  signInWithFacebook() {
    this.authService.signInFacebook().then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = err.message;
    });    
  }

  signInWithGithub() {
    this.authService.signInGithub().then(() => {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = err.message;
    });    
  }
}
