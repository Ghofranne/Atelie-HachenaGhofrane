/**
 * @author HachenaGhofrane
 * Module serveur pour le rendu côté serveur (SSR)
 */

import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppComponent,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
