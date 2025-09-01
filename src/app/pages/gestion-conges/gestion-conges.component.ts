import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { 
  MatTable, 
  MatCell, 
  MatHeaderCell, 
  MatHeaderRowDef, 
  MatRowDef, 
  MatColumnDef, 
  MatHeaderRow, 
  MatRow, 
  MatCellDef,
  MatHeaderCellDef,
  MatTableDataSource
} from '@angular/material/table';
import { CongeServiceService } from '../../services/conge-service.service';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBar,MatSnackBarModule} from '@angular/material/snack-bar';

export interface Conge {
  id: number;
  employe: string;
  typeConge: string;
  statut:string
  username: string;
  dateDebut: string;
  dateFin: string;
}



@Component({
  selector: 'app-gestion-conges',
  standalone: true,
  imports: [
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
  NgClass,
  NgIf,
  MatPaginatorModule,
  MatSnackBarModule,
],
  templateUrl: './gestion-conges.component.html',
  styleUrl: './gestion-conges.component.css'
})
export class GestionCongesComponent implements OnInit {
  conges: Conge[] = [];
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) 
  paginator!: MatPaginator;
  
  displayedColumns: string[] = ['id','employe','type','dates','status','actions'];
  constructor(private congeService: CongeServiceService,private snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.loadConges();
  }
  loadConges() {

    this.congeService.getAllConges(this.page,this.size).subscribe({
      next: (data: any) => {
        console.log("Données des congés reçues:", data);
        this.conges = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.dataSource = new MatTableDataSource(this.conges);
        this.dataSource.paginator = this.paginator;

      },
      error: (err: any) => {
        console.error(err);
        this.snackBar.open("Erreur lors du chargement des congee", "Fermer", {
        duration: 4000,   // 4s
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: ['error-snackbar']
      });
      }
    });

    
  }

  validerConge(id: number) {
    const conge = this.conges.find(c => c.id === id);
    this.congeService.updateStatusConge(id, 'Validé').subscribe({
      next: (updatedConge:any) => {
        if (conge) conge.statut = 'Validé';
        console.log('Congé mis à jour avec succès:', updatedConge);
      },
      error: (err:any) => {
        console.error('Erreur lors de la mise à jour du congé:', err);
      }
    });
  }

  refuserConge(id: number) {
    const conge = this.conges.find(c => c.id === id);
    this.congeService.updateStatusConge(id, 'Refusé').subscribe({
      next: (updatedConge:any) => {
        if (conge) conge.statut = 'Refusé';
        console.log('Congé mis à jour avec succès:', updatedConge);
      },
      error: (err:any) => {
        console.error('Erreur lors de la mise à jour du congé:', err);
      }
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex;
    //this.size = event.pageSize;
    this.loadConges();
  }
}
