import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManageUserListComponent } from './user-list.component';

describe('UserManageUserListComponent', () => {
  let component: UserManageUserListComponent;
  let fixture: ComponentFixture<UserManageUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserManageUserListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
