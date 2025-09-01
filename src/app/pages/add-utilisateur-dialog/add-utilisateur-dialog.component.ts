import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Role } from '../../src/app/services/gestionuserservice.service';

@Component({
  selector: 'app-add-utilisateur-dialog',
  templateUrl: './add-utilisateur-dialog.component.html',
  styleUrls: ['./add-utilisateur-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ]
})
export class AddUtilisateurDialogComponent implements OnInit {

  utilisateurForm: FormGroup;
  roles = Object.values(Role);


  constructor( 
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUtilisateurDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      matricule: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      role: [Role.RH, Validators.required],
    });
  }

   ngOnInit() {
    const utilisateur = this.data?.utilisateur;
    console.log("Utilisateur à éditer:", utilisateur);
    // Initialiser le formulaire avec les valeurs existantes si c'est un edit
    this.utilisateurForm = this.fb.group({
      nom: [utilisateur?.nom || '', Validators.required],
      prenom: [utilisateur?.prenom || '', Validators.required],
      matricule: [utilisateur?.matricule || '', Validators.required],
      email: [utilisateur?.email || '', [Validators.required, Validators.email]],
      phone: [utilisateur?.phone || '', Validators.required],
      password: ['', utilisateur ? [] : Validators.required], // mot de passe vide si édition
      role: [utilisateur?.role || Role.RH, Validators.required],
    });
  }

  submit() {
    if (this.utilisateurForm.valid) {
      this.dialogRef.close(this.utilisateurForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
