import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-showalbum',
  templateUrl: './showalbum.component.html',
  styleUrls: ['./showalbum.component.css']
 
})
export class ShowalbumComponent implements OnInit {
 username:String;
 userdetails:any;
 rootPath:String;
 picture:Array<Object> = [];
 albumname:String;
/****  new code */
myInterval: number = 5000;
activeSlideIndex: number = 0;
noWrapSlides: boolean = false;


 selectedPic:String;
  constructor(  private authservice:AuthService,
    private flashmessage:FlashMessagesService,
    private _router:Router,
  private route: ActivatedRoute) { }


onSelect(duration) { 
  this.myInterval=duration;
 
}
startSlideShow(){

}


/** new code */

  ngOnInit() {

    this.username=this.authservice.Userdetails();
   let params: any =  this.route.snapshot.params;
   console.log(params.id +' '+ params.name);
    this.rootPath= this.authservice.baseUrl();
    this.authservice.currentUserDetails(this.username).subscribe(data=>{
   if(data.success){
         data.msg.album.forEach((albumdata) => {
            if(albumdata.albumname == params.name && albumdata._id ==params.id){
                if(albumdata.imagedetails.length){
                  this.albumname=albumdata.albumname;
                  this.picture = albumdata.imagedetails;
                }
                else{
                   var my_json = { _id:"-1", picturename:"../assets/picture/noimage.gif" };
                   this.picture.push(my_json);
                }
            }
        });
        }
        else{
           console.log(JSON.stringify(data));
        }
 });
  }


}
