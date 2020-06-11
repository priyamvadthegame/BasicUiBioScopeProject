import { Component,ViewEncapsulation, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/bioscope.services';
import { NotifierService } from "angular-notifier";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { error } from 'protractor';

@Component({
    selector: 'user-profile',
    templateUrl: './app.profile.html',
    styleUrls: ['./app.profile.css']
})

export class UserProfleComponent implements OnInit{
    @ViewChild('RecommendationContent', { read: ElementRef }) public reccmContent: ElementRef<any>;
    public userProfileForm: FormGroup;
    public user;
    public moviesArray;
    username:string;
    email:string;
    public spinner =false;
    constructor (private formBuilder: FormBuilder, private userService: ProductService,private notify:NotifierService,private route:Router){
 
    }
    public RecmmscrollRight(): void {
        this.reccmContent.nativeElement.scrollTo({ left: (this.reccmContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
      }
    
      public RecmmscrollLeft(): void {
        this.reccmContent.nativeElement.scrollTo({ left: (this.reccmContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
      }
    onImageClick(movieId) {
      this.spinner=true;
      console.log(movieId)
      this.userService.getMoviesById(localStorage.getItem("authId"),String(movieId)).subscribe(response=>{ console.log(response); localStorage.setItem("movieObj",JSON.stringify(response));this.route.navigate(['/watch'])},error=>this.spinner=false)
    }
    ngOnInit(){
        this.spinner=false;
        if(localStorage.getItem("authId")===null||localStorage.getItem("authId")==="")
        {
          this.route.navigateByUrl("/loginpage")
        }
        else
        {    this.spinner=true;
            this.userService.getUserInfo(localStorage.getItem("authId")).subscribe(response=>{console.log(response);this.user=response;this.moviesArray=this.user.movieArray;this.spinner=false},(error)=>this.spinner=false)
        }
      
    }
    changePassword(){

       
    }

}