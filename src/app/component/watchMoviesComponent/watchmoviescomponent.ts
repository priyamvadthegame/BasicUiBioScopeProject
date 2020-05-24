import { Component,ViewEncapsulation, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ProductService} from '../../services/bioscope.services'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Data} from '../../providers/movieData'
@Component({
  selector: 'watchmovie',
  templateUrl: './watchmoviescomponent.html',
  styleUrls: ['./watchmoviescomponent.css'],
})
export class BioScopeWatchMovieComponent implements OnInit{
  public movieObject;
  public movieposter:string;
  public actorArray;
  public recommendedArray;
  @ViewChild('ActorContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;
  @ViewChild('RecommendationContent', { read: ElementRef }) public reccmContent: ElementRef<any>;
  constructor(private formBuilder: FormBuilder, private movieService: ProductService,private router:ActivatedRoute,private route:Router,private data:Data)
    {
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
    ngOnInit()
    {

      if(sessionStorage.length==0||sessionStorage.getItem("sessionId")=="")
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
            if(backdrops[i].height>=String(window.outerHeight)&&backdrops[i].width>=String(window.outerWidth))
            {
              this.movieposter=`https://image.tmdb.org/t/p/w500${backdrops[i].backdropPath}`
              break;
            }
        }
        this.actorArray=this.movieObject.actors
        this.recommendedArray=this.movieObject.recommendation
        console.log(this.movieposter)
        }
      }
}