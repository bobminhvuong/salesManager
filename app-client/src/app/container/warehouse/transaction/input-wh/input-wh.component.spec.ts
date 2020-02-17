import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWHComponent } from './input-wh.component';

describe('InputWHComponent', () => {
  let component: InputWHComponent;
  let fixture: ComponentFixture<InputWHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputWHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
