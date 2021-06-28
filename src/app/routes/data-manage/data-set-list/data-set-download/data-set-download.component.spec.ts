import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSetDownloadComponent } from './data-set-download.component';

describe('DataSetDownloadComponent', () => {
  let component: DataSetDownloadComponent;
  let fixture: ComponentFixture<DataSetDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSetDownloadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSetDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
