import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroomComponent } from './userroom.component';

describe('UserroomComponent', () => {
  let component: UserroomComponent;
  let fixture: ComponentFixture<UserroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
