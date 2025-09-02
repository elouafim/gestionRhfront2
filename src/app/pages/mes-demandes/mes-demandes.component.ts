import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CongeServiceService } from '../../services/conge-service.service';
import { AddcongedialogComponent } from '../addcongedialog/addcongedialog.component';

interface DemandeConge {
  id: number;
  employe: string;
  typeConge: string;
  statut: string;
  username: string;
  dateDebut: string;
  dateFin: string;
}

@Component({
  selector: 'app-mes-demandes',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    AddcongedialogComponent
  ],
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.css']
})
export class MesDemandesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['typeConge', 'dateDebut', 'dateFin', 'statut'];
  dataSource: MatTableDataSource<DemandeConge> = new MatTableDataSource<DemandeConge>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private congerService: CongeServiceService) { }

  ngOnInit(): void {
    this.loadDemandes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadDemandes() {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      console.error("Aucun email utilisateur trouvé dans la session");
      return;
    }

    this.congerService.getCongesByEmploye(userEmail, 0, 100).subscribe({
      next: (data: any) => {
        console.log("Données des demandes reçues:", data);
        this.dataSource.data = data.content;
      },
      error: (err: any) => {
        console.error("Erreur lors du chargement des demandes:", err);
      }
    });
  }

  nouvelleDemande() {
    const dialogRef = this.dialog.open(AddcongedialogComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nouvelle demande de congé:', result);
        this.congerService.createConge(result).subscribe({
          next: (data: any) => {
            console.log("Demande de congé ajoutée avec succès:", data);
            this.dataSource.data = [...this.dataSource.data, data]; // mettre à jour la table
          },
          error: (err: any) => {
            console.error("Erreur lors de l'ajout de la demande de congé:", err);
          }
        });
      }
    });
  }
}
