import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportWarehouseComponent } from './import-warehouse.component';

describe('ImportWarehouseComponent', () => {
  let component: ImportWarehouseComponent;
  let fixture: ComponentFixture<ImportWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
