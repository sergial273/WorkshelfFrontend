import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarregComponent } from './navbarreg.component';

describe('NavbarregComponent', () => {
  let component: NavbarregComponent;
  let fixture: ComponentFixture<NavbarregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarregComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
