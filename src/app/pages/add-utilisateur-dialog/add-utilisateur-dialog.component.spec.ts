import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUtilisateurDialogComponent } from './add-utilisateur-dialog.component';

describe('AddUtilisateurDialogComponent', () => {
  let component: AddUtilisateurDialogComponent;
  let fixture: ComponentFixture<AddUtilisateurDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUtilisateurDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUtilisateurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
