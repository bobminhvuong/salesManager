import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePackComponent } from './type-pack.component';

describe('TypePackComponent', () => {
  let component: TypePackComponent;
  let fixture: ComponentFixture<TypePackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypePackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
