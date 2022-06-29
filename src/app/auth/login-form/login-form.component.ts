import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  userEmail: string = '';
  userPassword: string = '';  

  constructor(private auth: AuthService) { }  
  
  ngOnInit(): void {
    // if (localStorage.getItem('token')) {
    //   this.auth.getCurrentUser().isLoggedIn = true;      
    // }
  }

  login(){
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
