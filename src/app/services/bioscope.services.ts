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
   getAllMovies(authorizationKey:string)
   {
     return this._httpClient.get('https://raha-bioscope-app.herokuapp.com/movie/all',{headers:this.httpHeaders.set('Authorization',authorizationKey)})
   }
   getUserInfo(authorizationKey:string)
   {
      return this._httpClient.get('https://raha-bioscope-app.herokuapp.com/user/me',{headers:this.httpHeaders.set('Authorization',authorizationKey)})
   }
   setWatchedMovieOfAUser(authorizationKey:string,movieObj:Object)
   {
    return this._httpClient.post('https://raha-bioscope-app.herokuapp.com/user/watchnow',JSON.stringify(movieObj),{headers:this.httpHeaders.set('Authorization',authorizationKey)})
   }
   getMoviesById(authorizationKey:string,movieKey:string)
   {
      return this._httpClient.get(`https://raha-bioscope-app.herokuapp.com/movie/id`,{headers:this.httpHeaders.set('Authorization',authorizationKey),params:{"id":movieKey}})
   }
   logout(authorizationKey:string)
   {
      return this._httpClient.get(`https://raha-bioscope-app.herokuapp.com/user/logout`,{headers:this.httpHeaders.set('Authorization',authorizationKey)})
   }
   sendCode(emailId:string)
   {
      return this._httpClient.post(`https://raha-bioscope-app.herokuapp.com/user/sendcode`,{"email":emailId},{headers:this.httpHeaders})
   }
   getMovesByCategory(authorizationKey:string,limit:number,category:string)
   {
      return this._httpClient.get(`https://raha-bioscope-app.herokuapp.com/movie/category?category=${category}&limit=${limit}`,{headers:this.httpHeaders.set('Authorization',authorizationKey)})
   }
   getMovieByIndustry(authorizationKey:string,limit:number,industry:string)
   {
      return this._httpClient.get(`https://raha-bioscope-app.herokuapp.com/movie/industry?i=${industry}&limit=${limit}`,{headers:this.httpHeaders.set('Authorization',authorizationKey)})
   }
}