import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarlogComponent } from './navbarlog.component';

describe('NavbarlogComponent', () => {
  let component: NavbarlogComponent;
  let fixture: ComponentFixture<NavbarlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarlogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
