/**
 * @author HachenaGhofrane
 * Composant pour afficher la liste des ateliers
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AtelierServiceHachenaGhofrane } from '../../services/atelier-HachenaGhofrane.service';
import { AtelierHachenaGhofrane } from '../../models/atelier-HachenaGhofrane.model';

@Component({
  selector: 'app-atelier-list-HachenaGhofrane',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './atelier-list-HachenaGhofrane.component.html',
  styleUrls: ['./atelier-list-HachenaGhofrane.component.css']
})
export class AtelierListHachenaGhofrane implements OnInit {
  ateliers: AtelierHachenaGhofrane[] = [];
  searchTerm: string = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private atelierService: AtelierServiceHachenaGhofrane,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAteliers();
  }

  /**
   * Charger tous les ateliers
   */
  loadAteliers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.atelierService.getAteliers().subscribe({
      next: (data) => {
        this.ateliers = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des ateliers: ' + error.message;
        this.isLoading = false;
        console.error('Erreur:', error);
      }
    });
  }

  /**
   * Naviguer vers le formulaire de création
   */
  navigateToCreate(): void {
    this.router.navigate(['/create']);
  }

  /**
   * Naviguer vers le formulaire d'édition
   */
  navigateToEdit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  /**
   * Supprimer un atelier
   */
  deleteAtelier(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet atelier ?')) {
      this.atelierService.deleteAtelier(String(id)).subscribe({
        next: () => {
          this.loadAteliers();
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression: ' + error.message;
          console.error('Erreur:', error);
        }
      });
    }
  }

  /**
   * Obtenir les ateliers filtrés par terme de recherche
   */
  getFilteredAteliers(): AtelierHachenaGhofrane[] {
    if (!this.searchTerm) {
      return this.ateliers;
    }
    return this.ateliers.filter(atelier =>
      atelier.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (atelier.emailFormateur && atelier.emailFormateur.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
}
