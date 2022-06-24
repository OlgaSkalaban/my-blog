import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './auth/login-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
//import { AuthModule } from './auth/auth.module';
import { HomePageComponent } from './home-page/home-page.component';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './shared/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignupFormComponent,
    LoginFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule
  ],
  providers: [ AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
