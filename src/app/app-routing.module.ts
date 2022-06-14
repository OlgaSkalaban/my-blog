import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './auth/login-form.component';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: HomePageComponent, pathMatch: 'full'},
    {path: 'login', component: LoginFormComponent},
    {path: 'signup', component: SignupFormComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
