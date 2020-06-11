import { Component,ViewEncapsulation, OnInit, ElementRef, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ProductService} from '../../services/bioscope.services'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Data} from '../../providers/movieData'
import { NotifierService } from "angular-notifier";
@Component({
  selector: 'mainpage',
  templateUrl: './bioscope.category.html',
  styleUrls: ['./bioscope.category.css'],
})
export class CategoryWiseMovies implements OnInit{
    @ViewChild('SuperHeroContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;
    public superheroCategory;
    public actionCategory;
    public horrorCategory;
    public comedyCategory;
    public crimeCategory;
    public romanceCategory;
    public spinner=false;
    public flagsuper=false;
    public flagAction=false;
    public flagHorror=false;
    public flagComedy=false;
    public flagCrime=false;
    public flagRomance=false;
    constructor(public movieservice:ProductService,public route:Router)
    {

    }

    public scrollRight(): void {
      this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
    }
  
    public scrollLeft(): void {
      this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
    }
    public checkAllDataCame()
    {
        if(this.flagAction&&this.flagComedy&&this.flagCrime&&this.flagHorror&&this.flagsuper&&this.flagRomance)
        {
          this.spinner=false;
        }
    }
    public onImageClick(movie:Object)
    {
      localStorage.setItem("movieObj",JSON.stringify(movie))
      this.route.navigate(['/watch'])
    }
    

    ngOnInit()
    {   
              this.spinner=true;
              this.movieservice.getMovesByCategory(localStorage.getItem("authId"),5,"superhero").subscribe(response=>{
                this.superheroCategory=response;  
                this.flagsuper=true;
                  this.checkAllDataCame();
                
              })
              this.movieservice.getMovesByCategory(localStorage.getItem("authId"),5,"horror").subscribe(response=>{
                this.horrorCategory=response;  
                this.flagHorror=true;
                  this.checkAllDataCame();
                
            })
            this.movieservice.getMovesByCategory(localStorage.getItem("authId"),5,"action").subscribe(response=>{
              this.actionCategory=response;
              this.flagAction=true;
              this.checkAllDataCame();
            
          })
            this.movieservice.getMovesByCategory(localStorage.getItem("authId"),5,"comedy").subscribe(response=>{
              this.comedyCategory=response;
              this.flagComedy=true;
              this.checkAllDataCame();
          
        })
        this.movieservice.getMovesByCategory(localStorage.getItem("authId"),5,"crime").subscribe(response=>{
          this.crimeCategory=response;
          this.flagCrime=true;
          this.checkAllDataCame();
          
      })
        this.movieservice.getMovesByCategory(localStorage.getItem("authId"),5,"romance").subscribe(response=>{
          this.romanceCategory=response;
          this.flagRomance=true;
          this.checkAllDataCame();
          
      })
    }
}