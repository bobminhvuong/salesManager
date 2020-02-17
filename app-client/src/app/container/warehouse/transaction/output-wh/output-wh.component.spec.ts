import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputWHComponent } from './output-wh.component';

describe('OutputWHComponent', () => {
  let component: OutputWHComponent;
  let fixture: ComponentFixture<OutputWHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputWHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputWHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
