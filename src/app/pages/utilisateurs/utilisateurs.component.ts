import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UtilisateurEditDialogComponent } from '../utilisateur-edit-dialog/utilisateur-edit-dialog.component';
import { GestionuserserviceService } from '../../src/app/services/gestionuserservice.service';
import { OnInit } from '@angular/core';
import { AddUtilisateurDialogComponent } from '../add-utilisateur-dialog/add-utilisateur-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBar,MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
  ],
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
  utilisateurs:any[]=[];
  displayedColumns = ['id', 'nom', 'prenom', 'email', 'role', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) 
  paginator!: MatPaginator;

  page: number = 0;
  size: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  constructor(private snackBar: MatSnackBar,private dialog: MatDialog,private userservie:GestionuserserviceService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userservie.getUsers(this.page, this.size).subscribe({
      next: (data: any) => {
        console.log("Données des utilisateurs reçues:", data);
        this.utilisateurs = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        // Créer le dataSource et le relier au paginator
        this.dataSource = new MatTableDataSource(this.utilisateurs);
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.error(err);
        this.snackBar.open("Erreur lors du chargement des utilisateurs", "Fermer", {
        duration: 4000,   // 4s
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: ['error-snackbar']  // optionnel pour custom style
      });
      }
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex;
    //this.size = event.pageSize;
    this.loadUsers();
  }

  editUtilisateur(utilisateur: any) {
    console.log("Utilisateur à éditer:", utilisateur);
    const dialogRef = this.dialog.open(AddUtilisateurDialogComponent, {
      width: '800px',
      data: { utilisateur }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userservie.updateUser(utilisateur.id,result).subscribe({
          next:(data:any)=>{
            console.log("Utilisateur mis à jour avec succès:", data);
          },
          error:(err:any)=>{
            console.error("Erreur lors de la mise à jour de l'utilisateur:", err);
          }
        });
      }
    });
  }

  deleteUtilisateur(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
    }
  }

  addUtilisateur() {
    const dialogRef = this.dialog.open(AddUtilisateurDialogComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nouvel utilisateur:', result);
        this.userservie.createUser(result).subscribe({
          next:(data:any)=>{
            console.log("Utilisateur ajouté avec succès:", data);
            this.utilisateurs.push(data); // Ajouter le nouvel utilisateur à la liste
          },
          error:(err:any)=>{
            console.error("Erreur lors de l'ajout de l'utilisateur:", err);
          }
        });
      }
    });
  }
}
