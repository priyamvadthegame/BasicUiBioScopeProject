import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BioScopeLogInComponent} from './component/loginAndSignupComponents/bioscope.login'
import {BioScopeRegisterComponent} from './component/signUpComponent/bioscope.register'
import {ProductService} from './services/bioscope.services'
import {HttpClientModule} from '@angular/common/http'
import {BioScopeMainPageComponent}  from './component/mainPageComponents/bioscope.mainpage.component'
import {CompleteImageUrl} from './pipes/imageUrlPipes'
import {CompleteTrailerUrl} from './pipes/trailerlinkpipe'
import {CompleteImageUrlWr} from './pipes/imageUrlWithoutArrayPipes'
import {CompleteBackDropImageUrl} from './pipes/imageUrlBackDropPath'
import {MovieDescription }  from './pipes/moveDescriptionPipe'
import { BioScopeWatchMovieComponent} from './component/watchMoviesComponent/watchmoviescomponent'
import {Data} from './providers/movieData'
import {DemoMaterialModule} from './material-module';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { NotifierModule } from "angular-notifier";
@NgModule({
  declarations: [
    AppComponent,BioScopeLogInComponent,BioScopeRegisterComponent,BioScopeMainPageComponent,CompleteImageUrl,MovieDescription,BioScopeWatchMovieComponent
    ,CompleteTrailerUrl,CompleteBackDropImageUrl,CompleteImageUrlWr],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule,DemoMaterialModule,
    Ng2PageScrollModule,
    NotifierModule.withConfig({
      position: {
 
        horizontal: {
          position: 'right',
        distance: 12
      },
       vertical: {
             position: 'top',
             distance: 12
            }
       
      }
    })
  ],
  providers: [ProductService,Data],
  bootstrap: [AppComponent]
})
export class AppModule { }
