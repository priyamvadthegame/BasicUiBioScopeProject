import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/bioscope.services';
import { NotifierService } from "angular-notifier";


@Component({
    selector: 'user-profile',
    templateUrl: './app.profile.html'
})

export class UserProfleComponent implements OnInit{
    public userProfileForm: FormGroup;
    public user;
    username:string;
    email:string;
    constructor (private formBuilder: FormBuilder, private userService: ProductService,private notify:NotifierService){
        this.createForm();
 
    }
    createForm(){
        this.userProfileForm=this.formBuilder.group({
            username: [null,[Validators.required,Validators.minLength]],
            email: [null,[Validators.required,Validators.minLength]],      
        });
    }
    onSubmit() {

        this.notify.notify("success","User Profile Updated Succesfully");
    }
    ngOnInit(){
      
    }
    changePassword(){

       
    }

}