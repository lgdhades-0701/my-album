import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
 /** validate user registration form */
  validateRegister(user){
    if( user.email == undefined || user.username == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }
  /** Validate user email address */
  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
/** validate username */
 validateUsername(username){
    const re = /^([a-z]|(\d(?!\d{0,2}\.\d{1,3}\.\d{1,3}\.\d{1,3})))([a-z\d]|(\.(?!(\.|-)))|(-(?!\.))){1,61}[a-z\d\.]$/;
    return re.test(username);
 }




/*** validate username */




  /** validate user login form */
  validateUserLogin(user){
    if(user.password==undefined || user.username==undefined){
      return false;
    }
    else{
      return true;
    }
  }


}
