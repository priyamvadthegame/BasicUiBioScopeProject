import { Component,ViewEncapsulation, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ProductService} from '../../services/bioscope.services'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotifierService } from "angular-notifier";
import { LocalService } from '../../services/local.service';
import {MatDialog} from '@angular/material/dialog';
import { CountdownComponent } from 'ngx-countdown';
import { NgOtpInputComponent } from 'ng-otp-input/lib/components/ng-otp-input/ng-otp-input.component';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class BioScopeRegisterComponent implements OnInit {
  public userProfileForm: FormGroup;
  public spinner=false
  constructor(private formBuilder: FormBuilder, private userService: ProductService,private notifier:NotifierService,private router:Router,private otpService:LocalService,private dialog: MatDialog )
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
    const userObj={"name":username,"email":email,"password":password}
    localStorage.setItem("userTempObj",JSON.stringify(userObj));
    this.userService.sendCode(String(email)).subscribe(response=>{
    let otp=response;
    this.otpService.setJsonValue("otp",String(JSON.parse(JSON.stringify(otp)).confirmation_code));
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    this.spinner=false;
  },
  error=>{
    console.log(error)
    this.notifier.notify("error", "Oops!Something Went Wrong Please Try agin after Some Time");
   this.spinner=false})
  }
  ngOnInit()
  {
    if(!(localStorage.getItem("sessionId")===null||localStorage.getItem("sessionId")===""))
    {
          this.router.navigateByUrl("/mainpage");
    }
  }
}

@Component({
  selector: 'dialog-sign-up',
  templateUrl: 'bioscope.rregister.otpDialogue.html',
  styleUrls:['./bioscope.register.otpDialogue.css']
})
export class DialogContentExampleDialog implements OnInit{
  @ViewChild('timer') countdownTimer:CountdownComponent
  @ViewChild('otp') otp:NgOtpInputComponent
  public countdown;
  public error=false;
  public success=false;
  public spinner=false;
  public errorMessage;
  public successMessage
  public resendButton=false;
  public happening;
  constructor(private otpService:LocalService, private userService: ProductService,private router:Router,private notifier:NotifierService,private dialog: MatDialog)
  {

  }
  onOtpChange(otp)
  {
    if (otp.length === 6) {
        if(String(otp)===this.otpService.getJsonValue("otp"))
        {      this.spinner=true;
                this.happening="verifying..."
              this.userService.userRegister(JSON.parse(localStorage.getItem("userTempObj"))).
                  subscribe(response=>{console.log(response);
                  localStorage.setItem("sessionId",JSON.parse(JSON.stringify(response)).token)
                  localStorage.removeItem("userTempObj")
                  this.otpService.clearToken();
                  this.spinner=false;
                  this.success=true;
                  this.error=false;
                  this.successMessage="Otp Verified Succesfully";
                  this.dialog.closeAll();
                  this.router.navigateByUrl("/mainpage");
              },error=>{
                this.otpService.clearToken();
                this.notifier.notify("error","Email Id Already Exists Please Login To Continue")
                this.dialog.closeAll();
                this.spinner=false;
              })
        
        }
        else{
          this.error=true
          this.errorMessage="Otp you entered is wrong"
        }
    }
  
  }
  countdownOver()
  { 
    console.log("hello")
    this.success=false;
    this.resendButton=true;
    this.otpService.clearToken();
    this.errorMessage="Otp Expired!! Resend Otp to Continue"
    this.error=true;
  }
  resetButton()
  {
      this.spinner=true;
      this.otp.setValue("");
      this.happening="sending code..."
      this.userService.sendCode(String((JSON.parse(localStorage.getItem("userTempObj"))).email)).subscribe(response=>{
        let otp=response;
        this.otpService.setJsonValue("otp",String(JSON.parse(JSON.stringify(otp)).confirmation_code));
        this.spinner=false;
        this.error=false;
        this.success=true;
        this.successMessage="Otp Send Successfully"
        this.countdownTimer.restart();
      },
      error=>{
        console.log(error)
        this.notifier.notify("error", "Oops!Something Went Wrong Please Try agin after Some Time");
        this.dialog.closeAll();
       this.spinner=false})

  }
  ngOnInit()
  {
      
  }
}
