import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {   

  constructor(private auth: AuthService, private router: Router) { }

  navUser = this.auth.user;
  isError = false;
  errorMessage = '';

  ngOnInit(): void { 
    if (this.auth.checkUserStatus()) {
      this.navUser.isLoggedIn = true;
    }
  } 

  logout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    }, err => {
      this.isError = true;
      this.errorMessage = err.message;
    });
  }
}
