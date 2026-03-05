/**
 * @author HachenaGhofrane
 * Documentation de l'intégration Frontend-Backend
 */

# 📚 Documentation CRUD Atelier - Intégration Frontend-Backend

## 🎯 Vue d'ensemble

Ce projet est une application Angular complète avec un backend Node.js/Express.js pour gérer les ateliers avec une base de données MySQL.

### Architecture

```
┌─────────────────────────────────────────────────┐
│  FRONTEND (Angular 18)                          │
│  Port: 4200                                     │
│  ├── Components:                                │
│  │   ├── AtelierListHachenaGhofrane             │
│  │   └── AtelierFormHachenaGhofrane             │
│  ├── Service:                                   │
│  │   └── AtelierServiceHachenaGhofrane          │
│  │       └── HttpClient -> Backend API          │
│  └── Models:                                    │
│      └── AtelierHachenaGhofrane                 │
└─────────────────────────────────────────────────┘
            ↓ (API Calls via HttpClient)
┌─────────────────────────────────────────────────┐
│  BACKEND (Express.js)                           │
│  Port: 3001                                     │
│  ├── Routes:                                    │
│  │   └── /api/ateliers                          │
│  ├── Controllers:                               │
│  │   └── atelierController                      │
│  └── Models:                                    │
│      └── Atelier Table (MySQL)                  │
└─────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────┐
│  DATABASE (MySQL)                               │
│  Database: suggestions_db                       │
│  Table: ateliers                                │
└─────────────────────────────────────────────────┘
```

## 🚀 Démarrage rapide

### 1. Frontend (Angular)

L'application est en cours d'exécution sur `http://localhost:4200`

### 2. Backend (Express.js)

L'API est en cours d'exécution sur `http://localhost:3001`

### 3. Base de données (MySQL)

- **Host**: localhost
- **User**: root
- **Password**: (vide par défaut)
- **Database**: suggestions_db

## 🔗 Points d'extrémité API

### Obtenir tous les ateliers
```
GET /api/ateliers
```

**Réponse**:
```json
[
  {
    "id": 1,
    "nom": "Angular Basics",
    "emailFormateur": "formateur@example.com",
    "nbrParticipant": 20,
    "statut": true
  }
]
```

### Obtenir un atelier par ID
```
GET /api/ateliers/:id
```

### Créer un nouvel atelier
```
POST /api/ateliers
Content-Type: application/json

{
  "nom": "React Basics",
  "emailFormateur": "formateur@example.com",
  "nbrParticipant": 25,
  "statut": true
}
```

### Mettre à jour un atelier
```
PUT /api/ateliers/:id
Content-Type: application/json

{
  "nom": "React Advanced",
  "emailFormateur": "formateur@example.com",
  "nbrParticipant": 30,
  "statut": true
}
```

### Supprimer un atelier
```
DELETE /api/ateliers/:id
```

## 📋 Validations Atelier

| Champ | Validation | Message d'erreur |
|-------|-----------|------------------|
| **nom** | Obligatoire, min 5 caractères | Doit contenir au moins 5 caractères |
| **emailFormateur** | Obligatoire, format email valide | Email invalide |
| **nbrParticipant** | Obligatoire, > 15, positif | Doit être supérieur à 15 |
| **statut** | Boolean (défaut: true) | N/A |

## 🔧 Structure des fichiers

### Frontend
```
src/app/
├── components/
│   ├── atelier-list/
│   │   ├── atelier-list-HachenaGhofrane.component.ts
│   │   ├── atelier-list-HachenaGhofrane.component.html
│   │   └── atelier-list-HachenaGhofrane.component.css
│   └── atelier-form/
│       ├── atelier-form-HachenaGhofrane.component.ts
│       ├── atelier-form-HachenaGhofrane.component.html
│       └── atelier-form-HachenaGhofrane.component.css
├── services/
│   └── atelier-HachenaGhofrane.service.ts
├── models/
│   └── atelier-HachenaGhofrane.model.ts
└── app.module.ts
```

### Backend
```
node-user-mysql/
├── routes/
│   └── atelierRoutes.js
├── controllers/
│   └── atelierController.js
├── models/
│   └── atelierModel.js
├── config/
│   └── database.js
├── init-db.js
├── app.js
└── package.json
```

## 🎨 Fonctionnalités

### Liste des Ateliers
- ✅ Affichage de tous les ateliers
- ✅ Recherche en temps réel (par nom ou email)
- ✅ Affichage du statut (Actif/Inactif)
- ✅ Boutons Éditer et Supprimer
- ✅ Gestion du chargement et des erreurs
- ✅ Confirmation avant suppression

### Formulaire (Création/Édition)
- ✅ Validation des champs en temps réel
- ✅ Messages d'erreur personnalisés
- ✅ Mode création vs édition
- ✅ Pré-remplissage des données en édition
- ✅ Gestion des erreurs serveur
- ✅ État de chargement pendant la soumission

## 🛠️ Technologies utilisées

### Frontend
- Angular 18
- TypeScript
- RxJS (Observables)
- HttpClient
- Reactive Forms
- Routing

### Backend
- Node.js
- Express.js
- MySQL2
- CORS
- Dotenv

### Base de données
- MySQL
- InnoDB
- UTF8MB4

## 📝 Notes importantes

1. **CORS activé**: Le backend permet les requêtes depuis le frontend
2. **HttpClient avec Observables**: Toutes les requêtes API retournent des Observables
3. **Gestion d'erreurs**: Les erreurs sont affichées à l'utilisateur
4. **Chargement asynchrone**: Indicateur de chargement pendant les appels API
5. **Validation côté client**: Validation immédiate dans le formulaire

## 🔍 Dépannage

### Le frontend n'arrive pas à se connecter au backend

1. Vérifiez que le backend fonctionne sur le port 3001
2. Assurez-vous que MySQL est en cours d'exécution
3. Vérifiez les logs du backend pour les erreurs de base de données
4. Ouvrez la console du navigateur (F12) pour voir les erreurs CORS

### Les données n'apparaissent pas

1. Vérifiez que la base de données `suggestions_db` existe
2. Vérifiez que la table `ateliers` existe
3. Vérifiez que les données existent dans la table

### Erreur de validation

1. Assurez-vous que tous les champs sont remplis correctement
2. Vérifiez les messages d'erreur affichés
3. Vérifiez les logs du backend

## 📞 Support

Pour toute question ou problème, consultez les logs:
- **Frontend**: Ouvrez la console du navigateur (F12)
- **Backend**: Vérifiez le terminal où le serveur est lancé

---

**Créé par**: HachenaGhofrane
**Date**: 2026-03-05
