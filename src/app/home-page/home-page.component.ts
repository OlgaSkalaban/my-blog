import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  userName = "";

  constructor(private auth: AuthService) {}  

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.userName = this.auth.getCurrentUser().replace(/[^a-zа-яё0-9@.]/gi, ' ');
  }  
}
