/**
 * @author HachenaGhofrane
 * Modèle pour la table Atelier
 */

export interface AtelierHachenaGhofrane {
  id: number;
  nom: string;
  emailFormateur: string;
  nbrParticipant: number;
  statut: boolean;
}

export class AtelierRequestHachenaGhofrane {
  id?: number;
  nom!: string;
  emailFormateur!: string;
  nbrParticipant!: number;
  statut: boolean = true;
}
