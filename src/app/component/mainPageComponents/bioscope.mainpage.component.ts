import { Component,ViewEncapsulation, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ProductService} from '../../services/bioscope.services'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Data} from '../../providers/movieData'
import { DomSanitizer } from '@angular/platform-browser';
import { NotifierService } from "angular-notifier";
@Component({
  selector: 'allcontents',
  templateUrl: './bioscope.mainpage.component.html',
  styleUrls: ['./bioscope.mainpage.component.css'],
})
export class BioScopeMainPageComponent implements OnInit{
  public userProfileForm: FormGroup;
  public movieList:Object=[];
  public topThreeMovieList:Array<any>=[]
  public timeOut;
  public spinner=false;
  public category:string;
  constructor(private formBuilder: FormBuilder, private movieService: ProductService,private route:Router,private activated:ActivatedRoute,private data:Data,private sanitizer:DomSanitizer,private notifier:NotifierService)
    {
        
    }
    getFirstThreeMovieList()
    {
      let movies=JSON.parse(JSON.stringify(this.movieList))
      for(var i=0;i<movies.length;i++)
      {   
          (this.movieList[i])['hover']=true
          console.log(this.movieList)
      }
    }

    getSaveTrailerUrlLink(link:string)
    {
      console.log(link)
      return this.sanitizer.bypassSecurityTrustResourceUrl(link)
    }

    getAllMovieList(category:string)
    {   
      this.spinner=true;  
      this.movieService.getMovesByCategory(localStorage.getItem("authId"),1000,category).subscribe(response=>{console.log(response); this.movieList=response;  this.getFirstThreeMovieList();this.spinner=false})
    }
    getAllMovieListByIndustry(industry:string)
    {
      this.spinner=true;
      this.movieService.getMovieByIndustry(localStorage.getItem("authId"),1000,industry).subscribe(response=>{console.log(response); this.movieList=response;  this.getFirstThreeMovieList();this.spinner=false})
    }

    watchMovieButtonClickEvent(movie:Object)
    {
      localStorage.setItem("movieObj",JSON.stringify(movie))
      this.route.navigate(['/watch'])
    }
    mouseEnter(movies)
    {
       this.timeOut= setTimeout (() => {
                 movies.hover=false
              },600);
    }
    mouseLeave(movies)
    {
        movies.hover=true;
        clearTimeout(this.timeOut)
    }

    ngOnInit()
    {
      this.spinner=false  
      if(localStorage.getItem("authId")===null||localStorage.getItem("authId")==="")
      {     
            this.route.navigateByUrl("/loginpage")
      }
        else
        { 
          this.activated.params.subscribe(params=>
          {
            this.category=params['category'];
            if(this.category=='hollywood'||this.category=='bollywood')
            {
              this.getAllMovieListByIndustry(this.category)
            }
            else
            {
              this.getAllMovieList(this.category);
            }
          });
            
           
        }
       
    }
}