// documents.component.ts
import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface Document {
  id: number;
  employeeName: string;
  type: string;
  date: string;
  fileUrl: string;
  status: 'Validé' | 'Nouveau' | 'En attente';
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgClass
  ],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  documents: Document[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    // Données statiques (plus tard ça viendra d’un service / API)
     this.documents = [
    { id: 1, employeeName: 'Mohamed Ali', type: 'Contrat', date: '2024-01-10', fileUrl: '/assets/docs/contrat-mohamed.pdf', status: 'Validé' },
    { id: 2, employeeName: 'Sara Ben', type: 'Attestation Travail', date: '2024-03-05', fileUrl: '/assets/docs/attestation-sara.pdf', status: 'Nouveau' },
    { id: 3, employeeName: 'Youssef Amine', type: 'Fiche de Paie', date: '2024-07-28', fileUrl: '/assets/docs/fiche-youssef.pdf', status: 'En attente' }
  ];
  }

  // Filtrage par nom employé
  get filteredDocuments(): Document[] {
    if (!this.searchTerm.trim()) {
      return this.documents;
    }
    return this.documents.filter(doc =>
      doc.employeeName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Simulation upload
  uploadDocument() {
    alert("Fonction d'upload à implémenter");
  }

  // Simulation suppression
  deleteDocument(id: number) {
    this.documents = this.documents.filter(doc => doc.id !== id);
  }
}
