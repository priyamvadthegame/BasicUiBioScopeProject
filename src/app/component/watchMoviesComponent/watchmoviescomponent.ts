import { Component,ViewEncapsulation, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ProductService} from '../../services/bioscope.services'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Data} from '../../providers/movieData'
@Component({
  selector: 'watchmovie',
  templateUrl: './watchmoviescomponent.html',
  styleUrls: ['./watchmoviescomponent.css'],
  encapsulation:ViewEncapsulation.None
})
export class BioScopeWatchMovieComponent implements OnInit{
  public movieObject;
  public movieposter:string;
  constructor(private formBuilder: FormBuilder, private movieService: ProductService,private router:ActivatedRoute,private route:Router,private data:Data)
    {
    }

    ngOnInit()
    {
     this.movieObject=JSON.parse(localStorage.getItem("movieObj"));
     this.movieposter=`https://image.tmdb.org/t/p/w500${this.movieObject.backdrop}`
     console.log(this.movieposter)
    }
}