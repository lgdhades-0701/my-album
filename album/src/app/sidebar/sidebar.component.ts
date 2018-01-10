import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 url: string;

   urlName:string;
   constructor(location: Location, router: Router){
      router.events.subscribe((val) => {
        this.urlName = location.path();
    });
   }
  ngOnInit() {

  }

}
