import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProductService} from './services/bioscope.services'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bio-scope-project';
  constructor(private router:Router, private userService: ProductService)
  {
     
  }
  checkLogeedInUser():Boolean
  {
    if(localStorage.getItem("sessionId")===null||localStorage.getItem("sessionId")==="")
    {
          return false;
    }
    else
    {
      return true;
    }
  }
  logout()
  {
    this.userService.logout(localStorage.getItem("sessionId")).subscribe((response)=>console.log(response));
    localStorage.removeItem("sessionId");
    this.router.navigateByUrl("/loginpage");
  }
}
