import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbookshareComponent } from './userbookshare.component';

describe('UserbookshareComponent', () => {
  let component: UserbookshareComponent;
  let fixture: ComponentFixture<UserbookshareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserbookshareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserbookshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
