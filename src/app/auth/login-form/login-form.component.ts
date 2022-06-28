import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  email: string = '';
  password: string = '';
  constructor(private auth: AuthService) { }  

  login(){
    if (this.email == '') {
      alert('Please, enter email');
      return;
    }

    if (this.password == '') {
      alert('Please, enter password');
      return;
    }

    this.auth.login(this.email, this.password);

    this.email = '';
    this.password = '';
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
