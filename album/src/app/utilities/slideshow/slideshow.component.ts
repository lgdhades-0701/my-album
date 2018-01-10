import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
   animations: [
  trigger('photoState', [
    state('move', style({
      transform: 'translateX(-100%)',
    })),
    state('enlarge',   style({
      transform: 'scale(1.5)',
    })),
    state('spin',   style({
      transform: 'rotateY(180deg) rotateZ(90deg)',
    })),
    transition('* => *', animate('500ms ease')),
  ])
]
})
export class SlideshowComponent implements OnInit {

   move = false;
  constructor() { }
  get stateName() {
    return this.move ? 'move' : 'enlarge'
  }
  toggle() {
    this.move = !this.move;
  }

  ngOnInit() {
  }

}
