import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataManageDataSetListComponent } from './data-set-list.component';

describe('DataManageDataSetListComponent', () => {
  let component: DataManageDataSetListComponent;
  let fixture: ComponentFixture<DataManageDataSetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataManageDataSetListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManageDataSetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
