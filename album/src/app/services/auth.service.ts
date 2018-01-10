import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
//import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  url:String;
  //url:String='http://ec2-52-39-99-102.us-west-2.compute.amazonaws.com:8080';
 // url:String="http://localhost:8080";
  constructor(private http:Http) {
   this.getUrl().subscribe(data => {
      this.url = data.url;
   });
   }
/***  public url setting */
 getUrl () {
    return this.http.get('assets/clienturl.json')
       .map(res => res.json());
}


/** end of public url setting */
  baseUrl(){
    this.user=localStorage.getItem('user');
    return JSON.parse(this.user).url;
  }

 registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.url+'/users/register', user,{headers: headers})
      .map(res => res.json());
  }

    /** user login */
  loginUser(user){
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.url+'/users/login',user,{headers:headers}).map(res=>res.json());
  }
  /** set user details on brower */
   storeCredential(token,user){
      localStorage.setItem('id_token',token);
      localStorage.setItem('user',JSON.stringify(user));
      this.authToken=token;
      this.user=user;
   }
    /**user details */
    Userdetails(){
     this.user=localStorage.getItem('user');
     //this.user="satish";
      return JSON.parse(this.user).username;
   }
    /** to check user login or not */
  tokenNotExpired(){
    if (localStorage.getItem('user')) {
            return true;
        }
     else{
      return false;
     }
  }

  isLoggedIn(){
    return this.tokenNotExpired();
   }

  isauthenticated(){
    if(this.tokenNotExpired()){
      this.user=localStorage.getItem('user');
        return JSON.parse(this.user);
    }
    else{
      return false;
    }

  }

  //logout user
   onLogout(){
       this.authToken='';
      this.user='';
      localStorage.clear();
    }


 multiplefilepost(formdata){
    let headers=new Headers();
    headers.append('Content-Type','text/html');
      //return this.http.post(this.url+'/users/addPicture/',formdata).map(res=>res.json());
    return this.http.post(this.url+'/users/addPicture/',formdata).map(res=>res.json());
  }


  currentUserDetails(username){
      let headers=new Headers();
      headers.append('Content-Type','application/json');
      return this.http.get(this.url+'/users/userDetails/'+username,{headers:headers}).map(res=>res.json());
   }

    addAlbum(album){
      let headers=new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post(this.url+'/users/addAlbum/',album,{headers:headers}).map(res=>res.json());
    }

   getPictures(){
    let headers=new Headers();
    this.user=this.Userdetails();
    headers.append('Content-Type','application/json');
    return this.http.get(this.url+'/users/listPictures/'+this.user,{headers:headers}).map(res=>res.json());
   }
}
