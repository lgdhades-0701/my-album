import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowalbumComponent } from './showalbum.component';

describe('ShowalbumComponent', () => {
  let component: ShowalbumComponent;
  let fixture: ComponentFixture<ShowalbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowalbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowalbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
