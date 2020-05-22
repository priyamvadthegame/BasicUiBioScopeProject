import { Component,ViewEncapsulation, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ProductService} from '../../services/bioscope.services'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Data} from '../../providers/movieData'
@Component({
  selector: 'mainpage',
  templateUrl: './bioscope.mainpage.component.html',
  styleUrls: ['./bioscope.mainpage.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class BioScopeMainPageComponent implements OnInit{
  public userProfileForm: FormGroup;
  public movieList:Object=[];
  public topThreeMovieList:Array<any>=[]
  constructor(private formBuilder: FormBuilder, private movieService: ProductService,private route:Router,private data:Data)
    {
        
    }
    getFirstThreeMovieList()
    {
      let movies=JSON.parse(JSON.stringify(this.movieList))
      for(var i=0;i<3;i++)
      {
          this.topThreeMovieList.push(movies[i])
         
      }
      console.log(this.topThreeMovieList)
    }

    getAllMovieList()
    {
        this.movieService.getAllMovies(sessionStorage.getItem("sessionId")).subscribe(response=>{console.log(response); this.movieList=response;  this.getFirstThreeMovieList();})
    }

    watchMovieButtonClickEvent(movie:Object)
    {
      localStorage.setItem("movieObj",JSON.stringify(movie))
      this.route.navigate(['/mainpage/watch'])
    }

    ngOnInit()
    {
        this.getAllMovieList();
       
    }
}