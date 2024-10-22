import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SaisieComponent } from './saisie/saisie.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'saisie', component: SaisieComponent },
];
