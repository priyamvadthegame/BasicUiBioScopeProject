import { Component,ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ProductService} from '../../services/bioscope.services'
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class BioScopeRegisterComponent {
  public userProfileForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: ProductService)
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
    let username=String(this.userProfileForm.get("username").value);
    let email=String(this.userProfileForm.get("email").value);
    let password=String(this.userProfileForm.get("password").value);
    this.userService.userRegister({"name":username,"email":email,"password":password}).subscribe(response=>console.log(response))
  }
}
