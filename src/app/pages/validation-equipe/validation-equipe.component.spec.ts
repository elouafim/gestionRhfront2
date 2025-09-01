import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationEquipeComponent } from './validation-equipe.component';

describe('ValidationEquipeComponent', () => {
  let component: ValidationEquipeComponent;
  let fixture: ComponentFixture<ValidationEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationEquipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
