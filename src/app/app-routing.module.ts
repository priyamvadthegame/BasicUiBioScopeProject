import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {BioScopeLogInComponent} from './component/loginAndSignupComponents/bioscope.login'
import {BioScopeRegisterComponent} from './component/signUpComponent/bioscope.register'
import {BioScopeMainPageComponent}  from './component/mainPageComponents/bioscope.mainpage.component'
import { BioScopeWatchMovieComponent} from './component/watchMoviesComponent/watchmoviescomponent'
import {UserProfleComponent} from "./component/profile component/app.profile"
import {CategoryWiseMovies} from './component/category content page component/bioscope.category'
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
  component:CategoryWiseMovies
},
{
  path:'watch',
  component:BioScopeWatchMovieComponent
},
{
  path:'user-profile',
  component:UserProfleComponent
},
{
  path:'allcontents/:category',
  component:BioScopeMainPageComponent
}];


@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration:"top",
    onSameUrlNavigation: "reload"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
