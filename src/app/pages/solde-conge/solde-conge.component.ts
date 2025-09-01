import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgModel } from '@angular/forms';

interface SoldeEmploye {
  nom: string;
  departement: string;
  total: number;
  pris: number;
  reste: number;
}

@Component({
  selector: 'app-solde-conge',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './solde-conge.component.html',
  styleUrls: ['./solde-conge.component.css']
})
export class SoldeCongeComponent {
  searchTerm: string = '';

  soldesEmployes: SoldeEmploye[] = [
    { nom: 'Ali', departement: 'IT', total: 30, pris: 12, reste: 18 },
    { nom: 'Sarah', departement: 'RH', total: 30, pris: 20, reste: 10 },
    { nom: 'Karim', departement: 'Finance', total: 25, pris: 5, reste: 20 },
    { nom: 'Mouna', departement: 'Marketing', total: 28, pris: 15, reste: 13 },
  ];

  get soldesFiltres() {
    if (!this.searchTerm) return this.soldesEmployes;
    return this.soldesEmployes.filter(e =>
      e.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      e.departement.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  displayedColumns: string[] = ['nom', 'departement', 'total', 'pris', 'reste'];

  rechercher(){
    
  }
}