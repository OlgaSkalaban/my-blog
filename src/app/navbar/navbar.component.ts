import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {   

  constructor(private authService: AuthService, private router: Router) { }

  navUser = this.authService.user;   

  logout() {
    this.authService.logout().then(() => {
      this.authService.user.isLoggedIn = false;
      this.router.navigate(['/login']);
    });
  }
}
