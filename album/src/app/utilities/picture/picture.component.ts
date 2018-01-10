import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
 username:String;
 userdetails:any;
 rootPath:String;
 picture:Array<Object> = [];

 constructor(
    private authservice:AuthService,
    private flashmessage:FlashMessagesService,
    private _routeter:Router) { }

  ngOnInit() {
    this.rootPath= this.authservice.baseUrl() ;
    this.authservice.getPictures().subscribe(data=>{
    if(data.success){
          if(data.msg.length){
          this.picture = data.msg;
          }
          else{
             var my_json = { _id:"-1", picturename:"../assets/picture/noimage.gif" };
             this.picture.push(my_json);
          }
        }
        else{
            console.log(JSON.stringify(data));
          }
    });

  }

}
