import { Routes } from '@angular/router';
import { MesDemandesComponent } from './pages/mes-demandes/mes-demandes.component';
import { HistoriqueCongesComponent } from './pages/historique-conges/historique-conges.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { ValidationEquipeComponent } from './pages/validation-equipe/validation-equipe.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';
import { GestionCongesComponent } from './pages/gestion-conges/gestion-conges.component';
import { SoldeCongeComponent } from './pages/solde-conge/solde-conge.component';
import { TableauBordComponent } from './pages/tableaubord/tableaubord.component';

export const routes: Routes = [
  { path: 'mes-demandes', component: MesDemandesComponent },
  { path: 'historique', component: HistoriqueCongesComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'validation-equipe', component: ValidationEquipeComponent },
  { path: 'utilisateurs', component: UtilisateursComponent },
  { path: 'conges', component: GestionCongesComponent },
  { path: 'solde-conge', component: SoldeCongeComponent },
  {path: 'Tableaubord', component: TableauBordComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
