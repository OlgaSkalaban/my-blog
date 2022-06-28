import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {  
  

  constructor(private auth: AuthService) { }

  ngOnInit(): void { }

  navUser = this.auth.user;

  logout() {
    this.auth.logout();
  }
}
