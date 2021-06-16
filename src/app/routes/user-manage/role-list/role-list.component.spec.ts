import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserManageRoleListComponent } from './role-list.component';

describe('UserManageRoleListComponent', () => {
  let component: UserManageRoleListComponent;
  let fixture: ComponentFixture<UserManageRoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserManageRoleListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
