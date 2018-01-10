import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
//import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class FileService {

 authToken: any;
  user: any;
 // url:String='http://ec2-52-39-99-102.us-west-2.compute.amazonaws.com:8080';
  url:String="http://localhost:3000";
  
  constructor(private http:Http) { }

  baseUrl(){
    return this.url;
  }

    filepost(formdata){
    console.log(formdata);
    let headers=new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post(this.url+'/users/addPicture/',formdata).map(res=>res.json());
  }

}
