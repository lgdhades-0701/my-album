import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addalbum',
  templateUrl: './addalbum.component.html',
  styleUrls: ['./addalbum.component.css']
})
export class AddalbumComponent implements OnInit {
 username:String;
 userdetails:any;
 albumname:String;
 rootPath:String;
 picture:Array<Object> = [];
 selectedPicture:Array<Object> = [];
 albumdata:Array<Object> = [];
 selected= false;

 constructor(
    private authservice:AuthService,
    private flashmessage:FlashMessagesService,
    private _router:Router) { }

  ngOnInit() {
    this.username=this.authservice.Userdetails();
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

  showSelected(pic){
    if(pic.selected == true){
      pic.selected=false;
      let index = this.selectedPicture.findIndex(d => d['_id'] === pic._id);
      this.selectedPicture.splice(index,1);
    }
    else {
      pic.selected=true;
      this.selectedPicture.push(pic);
    }
  }

  addAlbum(){
    if(this.albumname === undefined){
      this.flashmessage.show('Please Provide Album Name',{ cssClass:'alert-danger',  timeout:2000 });
     }
    else{
        const album = {
        selectedPicture: this.selectedPicture,
        albumname: this.albumname,
        username: this.username
      }
      this.authservice.addAlbum(album).subscribe(data=>{
        if(data.success){
          this.flashmessage.show(data.msg,{
          cssClass:'alert-success',
          timeout:5000 });
          this._router.navigate(['/album']);
        }
        else{
          this.flashmessage.show(data.msg,{ cssClass:'alert-danger',  timeout:2000 });
          this._router.navigate(['/album']);
        }
      });
    }
  }
}
