import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    NgIf,
    MatMenuModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatCardModule,
    MatExpansionModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  role: string = '';
  email: string = '';
  notificationsCount:any = 0;
  isLoggedIn: boolean = false;
  userAvatarUrl: string = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
  userFullName: string = 'Test User';

  username: string = 'testUser';

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
  // Récupère l'access token et pas l'ID token
  const tokenParsed = this.keycloakService.getKeycloakInstance().tokenParsed;

  const token = this.keycloakService.getKeycloakInstance().token;
  sessionStorage.setItem('access_token', token ?? '');

  console.log('tokenParsed :', tokenParsed);

  // Récupération des rôles Realm
  const realmRoles: string[] = tokenParsed?.realm_access?.roles || [];

  console.log('Rôles de l’utilisateur :', realmRoles);

  if (realmRoles.includes('RH')) {
    console.log('L’utilisateur a le rôle RH');
    this.role = 'RH';
  } else if (realmRoles.includes('MANAGER')) {
    this.role = 'MANAGER';
  } else if (realmRoles.includes('EMPLOYE')) {
    this.role = 'EMPLOYE';
  } else {
    this.role = 'ANONYME';
  }

  // Récupération de l'email
  this.email = tokenParsed?.['email'] || 'inconnu';

  // Stocker le rôle et l'email dans la session
  sessionStorage.setItem('userRole', this.role);
  sessionStorage.setItem('userEmail', this.email);

  console.log('Rôle stocké :', this.role);
  console.log('Email stocké :', this.email);


}
  logout() {
    this.keycloakService.logout().then(() => {
      console.log('Déconnexion réussie');
    }).catch(error => {
      console.error('Erreur lors de la déconnexion :', error);
    });
  }

}
