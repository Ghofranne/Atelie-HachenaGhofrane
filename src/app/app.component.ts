/**
 * @author HachenaGhofrane
 * Composant principal de l'application
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'hachenaGhofrane';
  author = 'HachenaGhofrane';
}
