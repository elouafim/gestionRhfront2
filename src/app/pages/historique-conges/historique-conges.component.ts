import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CongeServiceService } from '../../services/conge-service.service';

interface HistoriqueConge {
  id: number;
  employe: string;
  typeConge: string;
  statut:string
  username: string;
  dateDebut: string;
  dateFin: string;
}

@Component({
  selector: 'app-historique-conges',
  imports: [
    NgFor,
    NgClass
  ],
  templateUrl: './historique-conges.component.html',
  styleUrls: ['./historique-conges.component.css']
})
export class HistoriqueCongesComponent implements OnInit {
  historique: HistoriqueConge[] = [];
  page: number = 0;
  size: number = 10;

  constructor(private congerService:CongeServiceService) { }
  ngOnInit(): void {
    this.loadDemandes();
  }


  loadDemandes() {
  const userEmail = sessionStorage.getItem('userEmail');
  if (!userEmail) {
    console.error("Aucun email utilisateur trouvé dans la session");
    return;
  }

  this.congerService.getCongesByEmploye(userEmail, this.page, this.size).subscribe({
    next: (data: any) => {
      console.log("Données des demandes reçues:", data);
      this.historique = data.content;
    },
    error: (err: any) => {
      console.error("Erreur lors du chargement des demandes:", err);
    }
  });
}
}
