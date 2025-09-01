import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-utilisateur-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './utilisateur-edit-dialog.component.html',
  styleUrls: ['./utilisateur-edit-dialog.component.css']
})
export class UtilisateurEditDialogComponent {
  form: FormGroup;

  roles = ['EMPLOYE', 'MANAGER', 'RH'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UtilisateurEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [data.utilisateur.id],
      nom: [data.utilisateur.nom, Validators.required],
      prenom: [data.utilisateur.prenom, Validators.required],
      email: [data.utilisateur.email, [Validators.required, Validators.email]],
      role: [data.utilisateur.role, Validators.required],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}