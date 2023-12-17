import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialAddComponent } from './editorial-add.component';

describe('EditorialAddComponent', () => {
  let component: EditorialAddComponent;
  let fixture: ComponentFixture<EditorialAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorialAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorialAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
