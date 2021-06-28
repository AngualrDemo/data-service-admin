import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSetProbeComponent } from './data-set-probe.component';

describe('DataSetProbeComponent', () => {
  let component: DataSetProbeComponent;
  let fixture: ComponentFixture<DataSetProbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSetProbeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSetProbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
