import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxChartsModule } from '@swimlane/ngx-charts';

type Role = 'EMPLOYE' | 'MANAGER' | 'RH';

@Component({
  selector: 'app-tableaubord',
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    MatGridListModule,
    NgxChartsModule
  ],
  templateUrl: './tableaubord.component.html',
  styleUrls: ['./tableaubord.component.css']
})
export class TableauBordComponent implements OnInit {
  @Input() role: Role = 'RH';

  

  // Alertes / messages spécifiques par rôle
  alertMessages: Record<Role, string> = {
    EMPLOYE: "⚠️ Vous avez 1 demande de congé en retard.",
    MANAGER: "⚠️ 3 congés en attente de validation.",
    RH: "⚠️ 5 utilisateurs n'ont pas encore validé leur planning."
  };

  alertMessage: string | null = null;

  statsEmploye = [
    { title: 'Solde Congés', value: 12, unit: 'jours', icon: 'beach_access', color: '#2F80ED' },
    { title: 'Demandes en cours', value: 2, icon: 'pending_actions', color: '#F2C94C' },
    { title: 'Prochain congé', value: '2025-08-20', icon: 'event_available', color: '#27AE60' }
  ];

  statsManager = [
    { title: 'Congés à valider', value: 5, icon: 'assignment_turned_in', color: '#EB5757' },
    { title: 'Congés en cours équipe', value: 8, icon: 'groups', color: '#56CCF2' },
  ];

  statsRH = [
    { title: 'Total utilisateurs', value: 52, icon: 'people', color: '#9B51E0' },
    { title: 'Congés validés ce mois', value: 24, icon: 'check_circle', color: '#219653' },
    { title: 'Congés en attente', value: 6, icon: 'hourglass_empty', color: '#F2994A' }
  ];

  statsToDisplay: any[] = [];

  // Actions rapides par rôle (titre + icône)
  quickActions: Record<Role, { label: string; icon: string }[]> = {
    EMPLOYE: [
      { label: 'Nouvelle demande', icon: 'add_circle' },
      { label: 'Voir mes congés', icon: 'event_note' }
    ],
    MANAGER: [
      { label: 'Valider congés', icon: 'check_circle' },
      { label: 'Voir équipe', icon: 'groups' }
    ],
    RH: [
      { label: 'Gérer utilisateurs', icon: 'people' },
      { label: 'Gérer congés', icon: 'work' }
    ]
  };

  barChartData = [
    { name: 'Janvier', value: 5 },
    { name: 'Février', value: 8 },
    { name: 'Mars', value: 10 },
    { name: 'Avril', value: 6 },
    { name: 'Mai', value: 7 },
  ];

  // Graph options (inchangées)
  view: [number, number] = [700, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Mois';
  showYAxisLabel = true;
  yAxisLabel = 'Congés validés';

  colorScheme = { domain: ['#2F80ED'] };

  ngOnInit() {

    const storedRole = sessionStorage.getItem('userRole');
    console.log('Rôle récupéré du sessionStorage :', storedRole);
    if (storedRole === 'EMPLOYE' || storedRole === 'MANAGER' || storedRole === 'RH') {
      this.role = storedRole as Role;
    }

    this.alertMessage = this.alertMessages[this.role];

    if (this.role === 'EMPLOYE') this.statsToDisplay = this.statsEmploye;
    else if (this.role === 'MANAGER') this.statsToDisplay = this.statsManager;
    else if (this.role === 'RH') this.statsToDisplay = this.statsRH;
    else this.statsToDisplay = [];
  }

  onCardClick(title: string) {
    alert(`Vous avez cliqué sur la carte : ${title}`);
  }

  onQuickActionClick(label: string) {
    alert(`Action rapide : ${label}`);
  }
}