import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './auth/login-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
// import { AuthModule } from './auth/auth.module';
import { HomePageComponent } from './home-page/home-page.component';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignupFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule  
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
