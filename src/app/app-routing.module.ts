import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginFormComponent, canActivate: [LoginGuard]},
    {path: 'signup', component: SignupFormComponent},
    {path: 'home', component: HomePageComponent, canActivate: [HomeGuard]}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
