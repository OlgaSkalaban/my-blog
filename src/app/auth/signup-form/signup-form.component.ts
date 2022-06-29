import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  userEmail: string = '';
  userPassword: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.auth.getCurrentUser().isLoggedIn = true;      
    }
  }  

  register(){
    this.auth.register(this.userEmail, this.userPassword);

    this.userEmail = '';
    this.userPassword = '';
  } 
}
