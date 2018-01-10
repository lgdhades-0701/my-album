import { Component, OnInit } from '@angular/core';
import { NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
 

@Component({
  selector: 'app-addpicture',
  templateUrl: './addpicture.component.html',
  styleUrls: ['./addpicture.component.css']
})
export class AddpictureComponent implements OnInit {
  name:string;
 searchForm: FormGroup;
 filesToUpload: Array<File> = [];
 AllPhotoes:Array<any> =[];
 username:String;

  ngOnInit() {
    this.username=this.authservice.Userdetails();
    this.searchForm = this.fb.group({
      properties: this.fb.array([])
    });
  }

  constructor(private fb: FormBuilder,
    private authservice:AuthService,
    private flashmessage:FlashMessagesService,
    private _router:Router,
    private spinnerService: Ng4LoadingSpinnerService) {  }

    removeItem(index) {
     (<FormArray>this.searchForm.get('properties')).removeAt(index);
     this.AllPhotoes.splice(index, 1);
    }

  onAddProperty() {
    for(var i=1; i<=1; i++) {
      (<FormArray>this.searchForm.get('properties')).push(new FormControl());
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.AllPhotoes.push(this.filesToUpload );
}


upload() {
  if(this.AllPhotoes.length > 0){
  const formData: any = new FormData();
  for (var i=0;i<this.AllPhotoes.length;i++) {
    const files: Array<File> = this.AllPhotoes[i];
    for(let i =0; i < files.length; i++){
        formData.append("uploads", files[i], files[i]['name']);
    }
  }
  this.AllPhotoes=[];
  formData.append('username', this.username);
  this.spinnerService.show();
  this.authservice.multiplefilepost(formData).subscribe(data=>{
    if(data.success){
      this.spinnerService.hide();
      this.flashmessage.show(data.msg,{
         cssClass:'alert-success',
        timeout:5000
      });
      this._router.navigate(['/picture']);
    }
    else{
      this.flashmessage.show(data.msg,{ cssClass:'alert-danger',  timeout:2000 });
      this._router.navigate(['/picture']);
    }
  });
  }
else{
   this.flashmessage.show('Select Atleast One Images',{ cssClass:'alert-danger',  timeout:5000 });
}
}

cancel(){
   this._router.navigate(['/picture']);
}

  /*
filesToUpload: Array<File> = [];
 username:String;

 constructor(
    private authservice:AuthService,
    private flashmessage:FlashMessagesService,
    private _router:Router) { }

  ngOnInit() {
    this.username=this.authservice.Userdetails();
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }
    formData.append('username', this.username);

 this.authservice.filepost(formData).subscribe(data=>{
   console.log(data);
   if(data.success){
           this.flashmessage.show(data.msg,{
             cssClass:'alert-success',
             timeout:5000 });
           this._router.navigate(['/picture']);
        }
        else{
          this.flashmessage.show(data.msg,{ cssClass:'alert-danger',  timeout:5000 });
              this._router.navigate(['/picture']);
        }
 });
}

fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(JSON.stringify( this.filesToUpload));
}
*/
}
