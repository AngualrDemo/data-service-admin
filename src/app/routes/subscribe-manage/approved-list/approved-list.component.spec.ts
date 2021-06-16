import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscribeManageApprovedListComponent } from './approved-list.component';

describe('SubscribeManageApprovedListComponent', () => {
  let component: SubscribeManageApprovedListComponent;
  let fixture: ComponentFixture<SubscribeManageApprovedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribeManageApprovedListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeManageApprovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
