import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveWHComponent } from './move-wh.component';

describe('MoveWHComponent', () => {
  let component: MoveWHComponent;
  let fixture: ComponentFixture<MoveWHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveWHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveWHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
