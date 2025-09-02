import { Component, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { CongeServiceService } from '../../services/conge-service.service';
import { MatTable, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

interface HistoriqueConge {
  id: number;
  employe: string;
  typeConge: string;
  statut: string;
  username: string;
  dateDebut: string;
  dateFin: string;
}

@Component({
  selector: 'app-historique-conges',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    MatTable,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatPaginatorModule
  ],
  templateUrl: './historique-conges.component.html',
  styleUrls: ['./historique-conges.component.css']
})
export class HistoriqueCongesComponent implements OnInit {

  historique: HistoriqueConge[] = [];
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;

  displayedColumns: string[] = ['type', 'dateDebut', 'dateFin', 'statut'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private congeService: CongeServiceService) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      console.error("Aucun email utilisateur trouvé dans la session");
      return;
    }

    this.congeService.getCongesByEmploye(userEmail, this.page, this.size).subscribe({
      next: (data: any) => {
        console.log("Données des demandes reçues:", data);
        this.historique = data.content;
        this.totalPages = data.totalElements;
      },
      error: (err: any) => {
        console.error("Erreur lors du chargement des demandes:", err);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadDemandes();
  }
}
