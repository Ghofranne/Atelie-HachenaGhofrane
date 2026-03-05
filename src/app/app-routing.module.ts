/**
 * @author HachenaGhofrane
 * Module de routage principal
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtelierListHachenaGhofrane } from './components/atelier-list/atelier-list-HachenaGhofrane.component';
import { AtelierFormHachenaGhofrane } from './components/atelier-form/atelier-form-HachenaGhofrane.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/atelier', pathMatch: 'full' },
  { path: 'atelier', component: AtelierListHachenaGhofrane },
  { path: 'create', component: AtelierFormHachenaGhofrane },
  { path: 'edit/:id', component: AtelierFormHachenaGhofrane }
];

const routes: Routes = appRoutes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
