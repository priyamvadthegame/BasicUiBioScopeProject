import { Component,ViewEncapsulation, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ProductService} from '../../services/bioscope.services'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Data} from '../../providers/movieData'
import { NotifierService } from "angular-notifier";
@Component({
  selector: 'watchmovie',
  templateUrl: './watchmoviescomponent.html',
  styleUrls: ['./watchmoviescomponent.css'],
})
export class BioScopeWatchMovieComponent implements OnInit{
  public movieObject;
  public movieposterthumb:string;
  public movieposter;
  public actorArray;
  public genereString:String="";
  public recommendedArray;
  public tmdbRating;
  public user;
  public playVideo=false
  @ViewChild('ActorContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;
  @ViewChild('RecommendationContent', { read: ElementRef }) public reccmContent: ElementRef<any>;
  constructor(private formBuilder: FormBuilder, private movieService: ProductService,private router:ActivatedRoute,private route:Router,private data:Data,private notifier:NotifierService)
    {
      this.route.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
    }
    public scrollRight(): void {
      this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
    }
  
    public scrollLeft(): void {
      this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
    }
    public RecmmscrollRight(): void {
      this.reccmContent.nativeElement.scrollTo({ left: (this.reccmContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
    }
  
    public RecmmscrollLeft(): void {
      this.reccmContent.nativeElement.scrollTo({ left: (this.reccmContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
    }
    public onPlayVideo()
    {     
       
        if(this.playVideo===false)
        { 
          console.log("tr")
          this.movieService.getUserInfo(localStorage.getItem("authId")).subscribe(response=>{this.user=response;this.addMovieToUserWachList();})
        }
        this.playVideo=true
        
    }
    public addMovieToUserWachList()
    {   
        
        let movie_id=this.movieObject._id;
        let movie_poster;
        if(this.movieObject.posters.length>0)
        {
          movie_poster=(this.movieObject.posters[0]).posterPath;
        }
        else
        {
          movie_poster="null"
        }
        let alreadyAddedMovies=this.user.movieArray;
        let movieObjToBeAdded={
            "movieName":String(this.movieObject.title),
            "movie_id": String(movie_id),
            "movie_poster": String(movie_poster)
        }
        if(alreadyAddedMovies.length>0)
        { 
          let flag=0;
          for(let i=0;i<alreadyAddedMovies.length;i++)
          {
            if(alreadyAddedMovies[i].movie_id==movie_id)
            {
              flag=1;
              break;
            }
          }
          if(flag==0)
          {
            this.movieService.setWatchedMovieOfAUser(localStorage.getItem("authId"),movieObjToBeAdded).subscribe((response)=>console.log(response))
          }
        }
        else{
          this.movieService.setWatchedMovieOfAUser(localStorage.getItem("authId"),movieObjToBeAdded).subscribe((response)=>console.log(response))
        }
    }
    ngOnInit()
    { 
      this.playVideo=false
      if(localStorage.getItem("authId")===null||localStorage.getItem("authId")==="")
        {
          this.route.navigateByUrl("/loginpage")
        }
      else
      {
        
        this.movieObject=JSON.parse(localStorage.getItem("movieObj"));
        console.log(this.movieObject)
        let backdrops=this.movieObject.backdrops
        for(let i=0;i<backdrops.length;i++)
        {
              this.movieposterthumb=`https://image.tmdb.org/t/p/original${backdrops[i].backdropPath}`
              break;
        }
        if(backdrops.length>0)
        {
          let random=Math.floor(Math.random() *backdrops.length)
          this.movieposter=`https://image.tmdb.org/t/p/original${backdrops[random].backdropPath}`
                
        }
        
        this.actorArray=(this.movieObject.actors).filter((name)=> {
          if(name.actor_poster != null&&name.hasOwnProperty('actor_poster')) {
          return true
          }
          })
        this.recommendedArray=this.movieObject.recommendation.filter((name)=> {
          if(name.movie_poster != null&&name.hasOwnProperty('movie_poster')) {
          return true
          }
          })
          
        if(this.movieObject.hasOwnProperty("genres_array"))
        {
          let genereArray=this.movieObject.genres_array;
          if(genereArray.length>0)
          {
            for(let i=0;i<genereArray.length;i++)
            {   if(i<genereArray.length-1)
                {
                  this.genereString+=String(genereArray[i].genre)+","
                }
                else{
                  this.genereString+=String(genereArray[i].genre);
                }
              }
          }
         
        }
        this.tmdbRating=this.movieObject.rating;
        console.log(this.movieposter)
      }
    }
}