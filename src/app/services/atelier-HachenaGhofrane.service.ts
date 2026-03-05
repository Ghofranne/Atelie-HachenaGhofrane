/**
 * @author HachenaGhofrane
 * Service CRUD pour gérer les ateliers
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtelierHachenaGhofrane, AtelierRequestHachenaGhofrane } from '../models/atelier-HachenaGhofrane.model';

@Injectable({
  providedIn: 'root'
})
export class AtelierServiceHachenaGhofrane {
  private readonly API_URL = 'http://localhost:3001/api/ateliers';

  constructor(private http: HttpClient) {}

  /**
   * Obtenir tous les ateliers
   */
  getAteliers(): Observable<AtelierHachenaGhofrane[]> {
    return this.http.get<AtelierHachenaGhofrane[]>(this.API_URL);
  }

  /**
   * Obtenir un atelier par ID
   */
  getAtelierById(id: string): Observable<AtelierHachenaGhofrane> {
    return this.http.get<AtelierHachenaGhofrane>(`${this.API_URL}/${id}`);
  }

  /**
   * Créer un nouvel atelier
   */
  createAtelier(request: AtelierRequestHachenaGhofrane): Observable<AtelierHachenaGhofrane> {
    return this.http.post<AtelierHachenaGhofrane>(this.API_URL, request);
  }

  /**
   * Mettre à jour un atelier
   */
  updateAtelier(id: string, request: AtelierRequestHachenaGhofrane): Observable<AtelierHachenaGhofrane> {
    return this.http.put<AtelierHachenaGhofrane>(`${this.API_URL}/${id}`, request);
  }

  /**
   * Supprimer un atelier
   */
  deleteAtelier(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.API_URL}/${id}`);
  }
}
