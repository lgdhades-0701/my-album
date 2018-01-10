import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { CarouselModule } from 'ngx-bootstrap';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

/** components */
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
  /*** services  */
import {CanActivateViaAuthGuard} from './authguard/authenticate';
import {ValidateService} from './services/validate.service';
import {FileService} from './services/file.service';

import {AuthService} from './services/auth.service';
import { PictureComponent } from './utilities/picture/picture.component';
import { AlbumComponent } from './utilities/album/album.component';
import { AddalbumComponent } from './utilities/addalbum/addalbum.component';
import { AddpictureComponent } from './utilities/addpicture/addpicture.component';
import { ShowalbumComponent } from './utilities/showalbum/showalbum.component';
import { SlideshowComponent } from './utilities/slideshow/slideshow.component';






const appRoutes: Routes =  [
  {path:'', component: DashboardComponent,canActivate:[CanActivateViaAuthGuard]},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent,canActivate:[CanActivateViaAuthGuard]},
  {path:'profile', component: ProfileComponent,canActivate:[CanActivateViaAuthGuard]},
  {path:'album', component: AlbumComponent,canActivate:[CanActivateViaAuthGuard]},
  {path:'addalbum', component: AddalbumComponent,canActivate:[CanActivateViaAuthGuard]},
  {path:'picture', component: PictureComponent,canActivate:[CanActivateViaAuthGuard]},
  {path:'addpicture', component: AddpictureComponent,canActivate:[CanActivateViaAuthGuard]},
  {path:'showAlbum/:id/:name', component: ShowalbumComponent,canActivate:[CanActivateViaAuthGuard]},
  {path:'slideShow', component: SlideshowComponent,canActivate:[CanActivateViaAuthGuard]},

]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    SidebarComponent,
    PictureComponent,
    AlbumComponent,
    AddalbumComponent,
    AddpictureComponent,
    ShowalbumComponent,
    SlideshowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CarouselModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ValidateService,AuthService,CanActivateViaAuthGuard,FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
