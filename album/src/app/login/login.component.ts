import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;

  constructor(
    private authservice:AuthService,
    private validatedservice:ValidateService,
    private flashmessage:FlashMessagesService,
    private _router:Router) { }

  ngOnInit() {
  }
  onLoginSubmit(){
    let user = {
       username:this.username,
       password:this.password
    }
    if( this.validatedservice.validateUserLogin(user)) {

      this.authservice.loginUser(user).subscribe(data=>{
        if(data.success){
           this.authservice.storeCredential(data.token,data.user);
           this.flashmessage.show("successfully Logged In",{ cssClass:'alert-success', timeout:5000 });
            this.username= this.authservice.Userdetails();
            this._router.navigate(['dashboard']);
        }
        else{
       this.flashmessage.show(data.msg,{
             cssClass:'alert-danger',
             timeout:5000 });
           this._router.navigate(['login']);
        }

      });

    }
    else{

     this.flashmessage.show('Please fill required fields!!!',{
             cssClass:'alert-danger',
             timeout:5000 });

    }

  }

}
