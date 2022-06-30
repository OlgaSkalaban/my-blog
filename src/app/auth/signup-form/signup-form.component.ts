import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  userEmail: string = '';
  userPassword: string = '';  

  constructor(public auth: AuthService) { }  

  register(){
    this.auth.register(this.userEmail, this.userPassword);
    this.userEmail = '';
    this.userPassword = '';
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
