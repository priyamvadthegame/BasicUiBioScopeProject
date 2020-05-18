import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {BioScopeLogInComponent} from './component/loginAndSignupComponents/bioscope.login'
import {BioScopeRegisterComponent} from './component/loginAndSignupComponents/bioscope.register'

const routes: Routes = [{
  path: '',
  redirectTo:'loginpage',
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
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
