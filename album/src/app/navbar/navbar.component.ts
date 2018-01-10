import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
 username:any;
  constructor(  
    private authservice:AuthService,
    private flashmessage:FlashMessagesService,
    private _routeter:Router) { }

  ngOnInit() {
  }
  onLogout(){
    this.username="";
    this.authservice.onLogout();
    this.flashmessage.show('successfully Logout',{
      cssClass:"alert-success",
      timout:5000
    });
    this._routeter.navigate(['login']);
    return false;
  }

}
