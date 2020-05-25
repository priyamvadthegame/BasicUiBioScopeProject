import { Component,ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ProductService} from '../../services/bioscope.services'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotifierService } from "angular-notifier";
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class BioScopeRegisterComponent {
  public userProfileForm: FormGroup;
  public spinner=false
  constructor(private formBuilder: FormBuilder, private userService: ProductService,private notifier:NotifierService,private router:Router)
    {
        this.createForm()
    }
    
    createForm(){
      this.userProfileForm=new FormGroup({
          username: new FormControl(null,[Validators.required,Validators.minLength(3)]),
          password:  new FormControl(null,[Validators.required,Validators.minLength(8)]),
          email: new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
          repassword:new FormControl(null,[Validators.required])      
      });
  }
  register()
  {
    this.spinner=true;
    let username=String(this.userProfileForm.get("username").value);
    let email=String(this.userProfileForm.get("email").value);
    let password=String(this.userProfileForm.get("password").value);
    this.userService.userRegister({"name":username,"email":email,"password":password}).
    subscribe(response=>{console.log(response);
    localStorage.setItem("sessionId",JSON.parse(JSON.stringify(response)).token)
    this.spinner=false;
    this.router.navigateByUrl("/mainpage");
    
  },
  error=>{
    console.log(error)
    this.notifier.notify("error","Email Already Exists");
   this.spinner=false})
  }
}
