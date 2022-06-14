import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent{
  constructor(private router: Router){}

  buttons = ['vk', 'gmail', 'github']

  goToSignUpPage() {
    this.router.navigate(['/signup'])
  }
}
