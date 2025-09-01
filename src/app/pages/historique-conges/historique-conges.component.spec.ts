import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueCongesComponent } from './historique-conges.component';

describe('HistoriqueCongesComponent', () => {
  let component: HistoriqueCongesComponent;
  let fixture: ComponentFixture<HistoriqueCongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueCongesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
