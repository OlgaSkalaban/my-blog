import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  userEmail: string = '';
  userPassword: string = '';     

  constructor(public auth: AuthService) { }

  login(): void{
    this.auth.login(this.userEmail, this.userPassword);
  }  

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

  signInWithFacebook() {
    this.auth.signInFacebook();
  }

  signInWithGithub() {
    this.auth.signInGithub();
  }
}
