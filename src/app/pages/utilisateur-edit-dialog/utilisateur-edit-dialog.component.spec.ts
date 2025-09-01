import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurEditDialogComponent } from './utilisateur-edit-dialog.component';

describe('UtilisateurEditDialogComponent', () => {
  let component: UtilisateurEditDialogComponent;
  let fixture: ComponentFixture<UtilisateurEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilisateurEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilisateurEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
