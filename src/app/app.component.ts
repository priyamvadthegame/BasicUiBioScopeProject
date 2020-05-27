import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bio-scope-project';
  constructor(private router:Router)
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
    localStorage.removeItem("sessionId");
    this.router.navigateByUrl("/loginpage");
  }
}
