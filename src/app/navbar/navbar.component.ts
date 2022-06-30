import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {   

  constructor(private auth: AuthService) { }

  navUser = this.auth.user;

  ngOnInit(): void { 
    if (this.auth.checkUserStatus()) {
      this.navUser.isLoggedIn = true;
    } else {
      console.log('Пользователь не авторизован');
    }
  } 

  logout() {
    this.auth.logout();
  }
}
