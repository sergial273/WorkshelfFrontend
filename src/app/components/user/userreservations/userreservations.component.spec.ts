import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserreservationsComponent } from './userreservations.component';

describe('UserreservationsComponent', () => {
  let component: UserreservationsComponent;
  let fixture: ComponentFixture<UserreservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserreservationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserreservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
