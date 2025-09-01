import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CongeServiceService } from '../../services/conge-service.service';
import { AddcongedialogComponent } from '../addcongedialog/addcongedialog.component';

interface DemandeConge {
  id: number;
  employe: string;
  typeConge: string;
  statut:string
  username: string;
  dateDebut: string;
  dateFin: string;
}

@Component({
  selector: 'app-mes-demandes',
  imports: [
    NgFor,
    NgClass
  ],
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.css']
})
export class MesDemandesComponent implements OnInit {
  demandes: DemandeConge[] = [];
  page: number = 0;
  size: number = 10;

  constructor(private dialog:MatDialog,private congerService:CongeServiceService) { }

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
      this.demandes = data.content;
    },
    error: (err: any) => {
      console.error("Erreur lors du chargement des demandes:", err);
    }
  });
}


  nouvelleDemande() {
   const dialogRef= this.dialog.open(AddcongedialogComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nouvelle demande de congé:', result);
        this.congerService.createConge(result).subscribe({
          next: (data:any) => {
            console.log("Demande de congé ajoutée avec succès:", data);
            // Ajouter la nouvelle demande à la liste locale pour mise à jour immédiate
            this.demandes.push(data);
          },
          error: (err:any) => {
            console.error("Erreur lors de l'ajout de la demande de congé:", err);
          }
        });
      }
    });
}

}
