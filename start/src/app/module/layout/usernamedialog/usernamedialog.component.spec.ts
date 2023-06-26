import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernamedialogComponent } from './usernamedialog.component';

describe('UsernamedialogComponent', () => {
  let component: UsernamedialogComponent;
  let fixture: ComponentFixture<UsernamedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernamedialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsernamedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
