import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscribeManagePendingReviewComponent } from './pending-review.component';

describe('SubscribeManagePendingReviewComponent', () => {
  let component: SubscribeManagePendingReviewComponent;
  let fixture: ComponentFixture<SubscribeManagePendingReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribeManagePendingReviewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeManagePendingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
