import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
 username:String;
 userdetails:any;
 rootPath:String;
 album:Array<Object> = [];
 newarray:Array<Object>=[];

 constructor(
    private authservice:AuthService,
    private flashmessage:FlashMessagesService,
    private router:Router,location: Location) {
     router.events.subscribe((val) => {
        console.log('location path='+ location.path());
    });
   }

  ngOnInit() {
    this.username=this.authservice.Userdetails();
    this.rootPath= this.authservice.baseUrl();

    this.authservice.currentUserDetails(this.username).subscribe(data=>{
      if(data.success){
        for (let entry of data.msg.album) {
         // var my_json = { _id:"0", picturename:"noimage.gif" };
          var my_json = { _id:"-1", picturename:"../assets/picture/noimage.gif" };
          if(entry.imagedetails.length < 4){
            for(var i= entry.imagedetails.length ;i < 4 ;i++){
               entry.imagedetails.push(my_json);
          }
          }
          this.album.push(entry);
        }
      }
      else{
        console.log(JSON.stringify(data));
      }
    });

  }
}
