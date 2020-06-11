import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BioScopeLogInComponent} from './component/loginAndSignupComponents/bioscope.login'
import {BioScopeRegisterComponent} from './component/signUpComponent/bioscope.register'
import {DialogContentExampleDialog} from './component/signUpComponent/bioscope.register'
import {ProductService} from './services/bioscope.services'
import {LocalService} from './services/local.service'
import {StorageService} from './services/storage.service'
import {HttpClientModule} from '@angular/common/http'
import {BioScopeMainPageComponent}  from './component/mainPageComponents/bioscope.mainpage.component'
import {CategoryWiseMovies} from './component/category content page component/bioscope.category'
import {CompleteImageUrl} from './pipes/imageUrlPipes'
import {CompleteTrailerUrl} from './pipes/trailerlinkpipe'
import {CompleteImageUrlWr} from './pipes/imageUrlWithoutArrayPipes'
import {CompleteBackDropImageUrl} from './pipes/imageUrlBackDropPath'
import {PosterImageUrl} from './pipes/posterPAth'
import {MovieDescription }  from './pipes/moveDescriptionPipe'
import { BioScopeWatchMovieComponent} from './component/watchMoviesComponent/watchmoviescomponent'
import {Data} from './providers/movieData'
import {DemoMaterialModule} from './material-module';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { NotifierModule } from "angular-notifier";
import {UserProfleComponent} from "./component/profile component/app.profile"
import { NgOtpInputModule } from  'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,BioScopeLogInComponent,BioScopeRegisterComponent,BioScopeMainPageComponent,CompleteImageUrl,PosterImageUrl,MovieDescription,BioScopeWatchMovieComponent
    ,CompleteTrailerUrl,CompleteBackDropImageUrl,CompleteImageUrlWr,UserProfleComponent,DialogContentExampleDialog,CategoryWiseMovies],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule,DemoMaterialModule,
    Ng2PageScrollModule,
    NotifierModule,
    NgOtpInputModule,
    CountdownModule,
    BrowserAnimationsModule
  ],
  providers: [ProductService,Data,LocalService,StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
