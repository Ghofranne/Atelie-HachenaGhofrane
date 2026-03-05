/**
 * @author HachenaGhofrane
 * Composant pour créer ou éditer un atelier
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtelierServiceHachenaGhofrane } from '../../services/atelier-HachenaGhofrane.service';
import { AtelierHachenaGhofrane, AtelierRequestHachenaGhofrane } from '../../models/atelier-HachenaGhofrane.model';

@Component({
  selector: 'app-atelier-form-HachenaGhofrane',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './atelier-form-HachenaGhofrane.component.html',
  styleUrls: ['./atelier-form-HachenaGhofrane.component.css']
})
export class AtelierFormHachenaGhofrane implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  submitButtonText = 'Créer';
  atelierTitle = 'Nouvel Atelier';
  atelierToEdit?: AtelierHachenaGhofrane;
  isSubmitting = false;
  errorMessage = '';
  private atelierIdToEdit?: string;

  constructor(
    private formBuilder: FormBuilder,
    private atelierService: AtelierServiceHachenaGhofrane,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  /**
   * Initialiser le formulaire avec les validateurs
   */
  private initializeForm(): void {
    this.form = this.formBuilder.group({
      nom: [
        '',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      emailFormateur: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      nbrParticipant: [
        '',
        [
          Validators.required,
          Validators.min(16),
          this.positiveNumberValidator.bind(this)
        ]
      ],
      statut: [true]
    });
  }

  /**
   * Validateur personnalisé pour les nombres positifs
   */
  private positiveNumberValidator(control: any): { [key: string]: any } | null {
    const value = control.value;
    if (value !== null && value !== '') {
      if (Number(value) < 0) {
        return { 'negativeNumber': true };
      }
    }
    return null;
  }

  /**
   * Vérifier si on est en mode édition
   */
  private checkEditMode(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id) {
        this.atelierIdToEdit = id;
        this.isEditMode = true;
        this.submitButtonText = 'Mettre à jour';
        this.atelierTitle = 'Éditer Atelier';
        
        this.atelierService.getAtelierById(id).subscribe({
          next: (atelier) => {
            this.atelierToEdit = atelier;
            this.form.patchValue({
              nom: atelier.nom,
              emailFormateur: atelier.emailFormateur,
              nbrParticipant: atelier.nbrParticipant,
              statut: atelier.statut
            });
          },
          error: (error) => {
            this.errorMessage = 'Erreur lors du chargement de l\'atelier: ' + error.message;
            console.error('Erreur:', error);
          }
        });
      }
    });
  }

  /**
   * Soumettre le formulaire
   */
  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    const request: AtelierRequestHachenaGhofrane = this.form.value;

    if (this.isEditMode && this.atelierIdToEdit) {
      this.atelierService.updateAtelier(this.atelierIdToEdit, request).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/atelier']);
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la mise à jour: ' + error.message;
          this.isSubmitting = false;
          console.error('Erreur:', error);
        }
      });
    } else {
      this.atelierService.createAtelier(request).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/atelier']);
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la création: ' + error.message;
          this.isSubmitting = false;
          console.error('Erreur:', error);
        }
      });
    }
  }

  /**
   * Annuler et retourner à la liste
   */
  onCancel(): void {
    this.router.navigate(['/atelier']);
  }

  /**
   * Obtenir les messages d'erreur personnalisés
   */
  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    
    if (!control || !control.errors) {
      return '';
    }

    switch (fieldName) {
      case 'nom':
        if (control.errors['required']) {
          return 'Le nom est obligatoire';
        }
        if (control.errors['minlength']) {
          return 'Le nom doit contenir au moins 5 caractères';
        }
        break;
      case 'emailFormateur':
        if (control.errors['required']) {
          return 'L\'email est obligatoire';
        }
        if (control.errors['email']) {
          return 'Veuillez entrer un email valide';
        }
        break;
      case 'nbrParticipant':
        if (control.errors['required']) {
          return 'Le nombre de participants est obligatoire';
        }
        if (control.errors['min']) {
          return 'Le nombre de participants doit être supérieur à 15';
        }
        if (control.errors['negativeNumber']) {
          return 'Le nombre doit être positif';
        }
        break;
    }
    return '';
  }

  /**
   * Vérifier si un champ a une erreur
   */
  hasError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
