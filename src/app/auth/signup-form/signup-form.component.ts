import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  email: string = '';
  password: string = '';
  firstName = '';
  lastName = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }  

  register(){
    if (this.email == '') {
      alert('Please, enter email');
      return;
    }

    if (this.password == '') {
      alert('Please, enter password');
      return;
    }

    this.auth.register(this.email, this.password);

    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
  } 

}
