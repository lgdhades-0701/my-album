import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {ValidateService} from '../services/validate.service'
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit() {
  }
   onRegisterSubmit(){
    const user = {
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
     this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      //console.log('Please fill in all fields') ;
    return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
     // console.log('Please use a valid email');
      return false;
    }


      // Validate user name
    if(!this.validateService.validateUsername(user.username)){
      this.flashMessage.show('Please use a username (between 3-63 character starting with small letter,not containing (-,_,.) ', {cssClass: 'alert-danger', timeout: 3000});
     // console.log('Please use a valid email');
      return false;
    }



    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
      //console.log("successfully registered");
     this.router.navigate(['/login']);
      } else {
        // console.log("Something went wrong ");
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

}
