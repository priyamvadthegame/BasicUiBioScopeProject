import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {BioScopeLogInComponent} from './component/loginAndSignupComponents/bioscope.login'
import {BioScopeRegisterComponent} from './component/loginAndSignupComponents/bioscope.register'
import {BioScopeMainPageComponent}  from './component/mainPageComponents/bioscope.mainpage.component'
import { BioScopeWatchMovieComponent} from './component/watchMoviesComponent/watchmoviescomponent'
const routes: Routes = [{
  path: '',
  redirectTo:'mainpage',
  pathMatch: 'full'
},
{
  path:'loginpage',
  component:BioScopeLogInComponent
}
,
{
  path:'registerpage',
  component:BioScopeRegisterComponent
},
{
  path:'mainpage',
  component:BioScopeMainPageComponent
},
{
  path:'mainpage/watch',
  component:BioScopeWatchMovieComponent
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
