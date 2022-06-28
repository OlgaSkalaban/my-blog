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
  
  ngOnInit() {
    if (localStorage.getItem('token')) {
      //console.log('пользователь авторизован');
      this.auth.getCurrentUser().isLoggedIn = true;
      this.userName = this.auth.getCurrentUser().name.replace(/[^a-zа-яё0-9@.]/gi, ' ');
    } //else {
    //   console.log('Пользователь не авторизован');
    // }    
  }  
}
