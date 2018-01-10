import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 username:String;
 email:String;
 userdetails:any;
 rootPath:String;

 constructor( private authservice:AuthService) { }

  ngOnInit() {
    this.username=this.authservice.Userdetails();
    this.authservice.currentUserDetails(this.username).subscribe(data=>{
      if(data.success){
        this.email=data.msg.email;
      }
      else{
      console.log(JSON.stringify(data));
      }
    });
  }
}
