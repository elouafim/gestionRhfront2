import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface CongeEquipe {
  id: number;
  employe: string;
  type: string;
  dateDebut: string;
  dateFin: string;
  status: 'EN ATTENTE' | 'VALIDÉ' | 'REFUSÉ';
}

@Component({
  selector: 'app-validation-equipe',
  imports: [
    NgFor,
    NgClass,
    NgIf
  ],
  templateUrl: './validation-equipe.component.html',
  styleUrls: ['./validation-equipe.component.css']
})
export class ValidationEquipeComponent implements OnInit {
  conges: CongeEquipe[] = [];

  ngOnInit(): void {
    this.conges = [
      { id: 1, employe: 'Ali', type: 'Annuel', dateDebut: '2025-08-20', dateFin: '2025-08-25', status: 'EN ATTENTE' },
      { id: 2, employe: 'Sarah', type: 'Maladie', dateDebut: '2025-08-10', dateFin: '2025-08-12', status: 'VALIDÉ' },
      { id: 3, employe: 'Karim', type: 'Sans solde', dateDebut: '2025-09-01', dateFin: '2025-09-05', status: 'REFUSÉ' },
      { id: 4, employe: 'Mouna', type: 'Annuel', dateDebut: '2025-09-10', dateFin: '2025-09-15', status: 'EN ATTENTE' }
    ];
  }

  validerConge(id: number) {
    const conge = this.conges.find(c => c.id === id);
    if (conge) conge.status = 'VALIDÉ';
  }

  refuserConge(id: number) {
    const conge = this.conges.find(c => c.id === id);
    if (conge) conge.status = 'REFUSÉ';
  }
}
