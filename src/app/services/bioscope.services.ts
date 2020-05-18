import {Injectable} from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable()
export class ProductService{
    public httpHeaders:HttpHeaders;

   constructor(private _httpClient:HttpClient){
     this.httpHeaders=new HttpHeaders()
       .set('allow-origin-access-control','*')
       .set('Content-type','application/json')
       .set('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS')
       .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
   }
   
   userLogin(userObj:Object)
   {
    return this._httpClient.post('https://raha-bioscope-app.herokuapp.com/user/login', JSON.stringify(userObj),{headers:this.httpHeaders}); 
   }
   userRegister(userObj:Object)
   {
    return this._httpClient.post('https://raha-bioscope-app.herokuapp.com/user/signup', JSON.stringify(userObj),{headers:this.httpHeaders}); 
   }
}