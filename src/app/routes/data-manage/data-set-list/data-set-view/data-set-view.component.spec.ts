import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSetViewComponent } from './data-set-view.component';

describe('DataSetViewComponent', () => {
  let component: DataSetViewComponent;
  let fixture: ComponentFixture<DataSetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSetViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
