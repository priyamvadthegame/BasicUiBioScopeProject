import { Component,ViewEncapsulation} from '@angular/core';
import {ProductService} from '../../services/bioscope.services'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class BioScopeLogInComponent {
 
  public userProfileForm:FormGroup;
  constructor(private userService: ProductService,private router:Router)
  {
      this.createForm()
  }

  createForm(){
    this.userProfileForm=new FormGroup({
        password:  new FormControl(null,[Validators.required,Validators.minLength(8)]),
        email: new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
          
    });
}
  login()
  { 
    let username=String(this.userProfileForm.get("email").value)
    let password=String(this.userProfileForm.get("password").value)
    console.log(username)
    this.userService.userLogin({"email":username,"password":password}).subscribe(response=>{console.log(response)
    sessionStorage.setItem("sessionId",JSON.parse(JSON.stringify(response)).token)
    this.router.navigateByUrl("/mainpage");
  })
  }
}