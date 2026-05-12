# Description Complète du Projet
## Plateforme de Suivi et Déploiement Automatisé de Projets Technologiques Conteneurisés

---

## 📋 Table des Matières
1. [Vue d'ensemble](#vue-densemble)
2. [Contexte et Justification](#contexte-et-justification)
3. [Objectifs du Projet](#objectifs-du-projet)
4. [Architecture Technique](#architecture-technique)
5. [Fonctionnalités Détaillées](#fonctionnalités-détaillées)
6. [Spécifications Non Fonctionnelles](#spécifications-non-fonctionnelles)
7. [Planification et Livrables](#planification-et-livrables)
8. [Budget](#budget)

---

## 🎯 Vue d'ensemble

### Informations Institutionnelles
- **Institution** : Université d'Abomey-Calavi (UAC)
- **Institut** : Institut de Formation et de Recherche en Informatique (IFRI)
- **Niveau** : Master 2
- **Spécialité** : Génie Logiciel
- **Année académique** : 2025-2026
- **Superviseur** : Dr. John AOGA

### Équipe Projet
- AMOUSSOUGBO Giovanus
- SOGLO Grace Hillary Sehouénou
- LABOCOUDE Adéchola Mérique Alexis
- GBODOGBE Princélu Gbènonvi
- ZANNOU Farihane

### Description Synthétique
La plateforme est une solution web moderne permettant aux développeurs de déployer automatiquement leurs applications conteneurisées sans se préoccuper de la complexité de l'infrastructure. Elle simplifie drastiquement le processus de mise en production en transformant un dépôt GitHub ou une archive ZIP en une application web accessible en quelques minutes.

---

## 🌍 Contexte et Justification

### Problématique Actuelle
Dans l'écosystème actuel du développement logiciel, le déploiement d'applications présente plusieurs défis majeurs :

1. **Complexité technique** : Le déploiement nécessite des compétences DevOps avancées
2. **Perte de temps** : Les développeurs passent des heures à configurer des environnements
3. **Gestion d'infrastructure** : Le temps consacré aux serveurs et au débogage détourne de l'innovation
4. **Barrière à l'entrée** : Les petites équipes et étudiants ont du mal à déployer professionnellement

### Solutions Existantes et Leurs Limites
Les plateformes comme Heroku, Vercel ou Railway offrent des services similaires mais présentent des limitations :

- **Coûts élevés** pour les projets multiples
- **Manque de flexibilité** dans la configuration Docker
- **Difficultés d'intégration** avec les workflows existants
- **Courbe d'apprentissage** parfois complexe

### Valeur Ajoutée du Projet
Notre solution vise à :

1. **Réduire le temps de déploiement** : De plusieurs heures à quelques minutes
2. **Démocratiser l'accès** : Solution économique pour petites équipes et étudiants
3. **Standardiser les processus** : Docker comme technologie de base universelle
4. **Libérer la créativité** : Permettre aux développeurs de se concentrer sur le code

---

## 🎯 Objectifs du Projet

### Objectifs Principaux
1. Créer une plateforme web intuitive et accessible
2. Automatiser le déploiement de conteneurs Docker
3. Fournir un monitoring en temps réel des applications
4. Offrir une solution économique et éducative

### Cas d'Usage Cibles
- **Étudiants** : Déployer leurs projets académiques facilement
- **Développeurs indépendants** : Tester et déployer rapidement des prototypes
- **Petites équipes** : Gérer plusieurs projets sans infrastructure complexe
- **Formateurs** : Enseigner le déploiement moderne d'applications

---

## 🏗️ Architecture Technique

### Stack Technologique

| Couche | Technologie | Rôle |
|--------|-------------|------|
| **Frontend** | React / Vue.js | Interface utilisateur moderne et réactive |
| **Backend API** | FastAPI | API REST performante et typée |
| **Job Queue** | Celery + Redis | Gestion asynchrone des tâches de build |
| **Conteneurisation** | Docker | Isolation et standardisation des applications |
| **Orchestration** | Docker Engine | Gestion des conteneurs (MVP) |
| **Base de données** | PostgreSQL | Persistance des données |
| **Reverse Proxy** | Nginx | Routage et exposition des applications |
| **Communication temps réel** | WebSockets | Logs et notifications en temps réel |

### Architecture Logicielle
```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                    (React / Vue.js)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST + WebSockets
┌──────────────────────┴──────────────────────────────────────┐
│                      BACKEND API                             │
│                       (FastAPI)                              │
└──┬────────────────┬────────────────┬────────────────────────┘
   │                │                │
   │ PostgreSQL     │ Celery/Redis   │ Docker Engine
   │ (données)      │ (jobs async)   │ (conteneurs)
   │                │                │
   └────────────────┴────────────────┴────────────────────────┐
                                                                │
                                                        ┌───────┴──────┐
                                                        │    Nginx     │
                                                        │ (exposition) │
                                                        └──────────────┘
```

### Flux de Travail Principal

1. **Import du code** : L'utilisateur upload une archive ou fournit un lien GitHub
2. **Validation** : Le système vérifie la présence d'un Dockerfile valide
3. **Build asynchrone** : Celery construit l'image Docker en arrière-plan
4. **Déploiement** : Le conteneur est lancé avec la configuration définie
5. **Exposition** : Nginx route le trafic vers une URL unique
6. **Monitoring** : Les logs sont streamés en temps réel via WebSockets

---

## 🚀 Fonctionnalités Détaillées

### SF1 : Authentification et Profil

#### SF1.1 - Inscription et Connexion
- Création de compte avec email et mot de passe
- Email de confirmation automatique
- Réinitialisation de mot de passe par email
- Validation des données en temps réel

#### SF1.2 - Gestion du Profil
- Affichage de l'historique d'utilisation
- Visualisation des quotas (nombre de projets, ressources utilisées)
- Suppression de compte avec confirmation et purge totale des données

---

### SF2 : Gestion des Sources de Code

#### SF2.1 - Upload de Code Source
- **Formats supportés** : ZIP, TAR.GZ
- **Processus** :
  - Upload sécurisé du fichier
  - Extraction automatique
  - Validation de la présence d'un Dockerfile
  - Stockage sécurisé des fichiers
- **Sécurité** : Vérification de la taille et du type de fichier

#### SF2.2 - Intégration GitHub
- **Configuration** :
  - Saisie du lien direct vers un dépôt public
  - Sélection de la branche à déployer
  - Clone automatique du dépôt
- **Détection intelligente** :
  - Recherche automatique du Dockerfile
  - Support des structures de projet variées
- **Automatisation (post-MVP)** :
  - Configuration de webhooks
  - Déploiement automatique sur push

---

### SF3 : Configuration des Projets

#### SF3.1 - Configuration Basique
- **Métadonnées** :
  - Nom du projet (obligatoire, unique)
  - Description détaillée (optionnelle)
  - Tags pour organisation et filtrage
- **Gestion** :
  - Modification à tout moment
  - Conservation de l'historique des changements

---

### SF4 : Build et Déploiement

#### SF4.1 - Construction de l'Image Docker
- **Processus automatisé** :
  - Lecture et analyse du Dockerfile
  - Construction de l'image Docker
  - Gestion des dépendances et layers
- **Monitoring** :
  - Logs de build affichés en temps réel
  - Progression visuelle du build
  - Possibilité de relancer en cas d'échec
- **Gestion d'erreurs** :
  - Messages d'erreur explicites
  - Suggestions de correction

#### SF4.2 - Déploiement du Conteneur
- **Lancement automatique** :
  - Démarrage du conteneur après build réussi
  - Application des configurations utilisateur
  - Allocation automatique des ressources
- **URL unique** :
  - Génération automatique d'une URL aléatoire
  - Format : `projet-abc123.deployhub.io`
  - Possibilité de domaine personnalisé (post-MVP)
- **Statut en temps réel** :
  - Running : Application accessible
  - Stopped : Conteneur arrêté
  - Building : Construction en cours
  - Error : Problème détecté

#### SF4.3 - Détection du Type d'Application
- **Application Web** :
  - Détection de serveurs HTTP
  - Ports standards : 80, 3000, 8000, 8080
- **API REST** :
  - Frameworks supportés : FastAPI, Express, Flask, Django REST
  - Configuration automatique de l'exposition

---

### SF5 : Exposition des Applications Déployées

#### SF5.1 - Applications Web
- **URL automatique** :
  - Génération d'un sous-domaine unique
  - Format lisible et mémorisable
  - Certificat SSL automatique (HTTPS)
- **Accès** :
  - Lien direct cliquable depuis le dashboard
  - Partage facile de l'URL
  - Badge de statut (en ligne/hors ligne)
- **Domaine personnalisé (post-MVP)** :
  - Configuration CNAME
  - Validation de propriété
  - Gestion des certificats SSL

---

### SF6 : Dashboard et Gestion des Projets

#### SF6.1 - Vue d'Ensemble
- **Liste des projets** :
  - Affichage en grille ou liste
  - Tri par date, nom, statut
  - Recherche par nom ou tag
- **Filtres avancés** :
  - Par statut (Running, Stopped, Building, Error)
  - Par tag personnalisé
  - Par période de création
- **Statistiques globales** :
  - Nombre total de projets
  - Projets actifs vs inactifs
  - Utilisation des ressources
  - Graphiques de tendances

#### SF6.2 - Page Détail d'un Projet
- **Informations principales** :
  - Nom et description
  - Source (GitHub ou Upload)
  - Date de création et dernière modification
  - Statut actuel avec badge coloré
- **URL d'accès** :
  - Lien cliquable vers l'application
  - Bouton de copie rapide
  - QR code pour partage mobile
- **Logs en temps réel** :
  - Stream WebSocket des logs
  - Filtrage par niveau (info, warning, error)
  - Recherche par mot-clé
  - Auto-scroll configurable
- **Historique des déploiements** :
  - Liste chronologique des builds
  - Statut de chaque déploiement
  - Durée de construction
  - Possibilité de rollback (post-MVP)

#### SF6.3 - Actions sur les Projets
- **Redémarrer** : Relance le conteneur sans rebuild
- **Arrêter** : Stoppe le conteneur (libère les ressources)
- **Supprimer** : Suppression avec confirmation obligatoire
- **Reconstruire** : Nouveau build à partir des sources
- **Exporter les logs** : Téléchargement en TXT ou JSON
- **Dupliquer** : Cloner la configuration pour un nouveau projet

---

### SF7 : Logs et Monitoring

#### SF7.1 - Consultation des Logs
- **Affichage temps réel** :
  - Connexion WebSocket persistante
  - Mise à jour automatique sans rechargement
  - Latence minimale (<100ms)
- **Filtrage avancé** :
  - Par niveau : INFO, WARNING, ERROR, DEBUG
  - Par période temporelle
  - Par recherche textuelle avec regex
- **Interface** :
  - Coloration syntaxique
  - Timestamps clairs
  - Numérotation des lignes
  - Mode sombre/clair

#### SF7.2 - Export et Historique
- **Formats d'export** :
  - TXT : Format brut lisible
  - JSON : Format structuré pour analyse
- **Conservation** :
  - Logs conservés pendant 10 jours
  - Archivage automatique
  - Notification avant suppression
- **Téléchargement** :
  - Logs d'un déploiement spécifique
  - Logs d'une période donnée
  - Export complet du projet

---

### SF8 : Notifications et Alertes

#### SF8.1 - Notifications Système
- **Types de notifications** :
  - Déploiement réussi : Confirmation avec URL
  - Déploiement échoué : Message d'erreur et solution
  - Build démarré : Indication du début du processus
  - Conteneur arrêté : Notification d'arrêt inattendu
- **Canaux** :
  - In-app : Badge et centre de notifications
  - Email : Pour événements critiques (post-MVP)
- **Préférences** :
  - Activation/désactivation par type
  - Fréquence configurable

---

## 🔒 Spécifications Non Fonctionnelles

### SNF1 - Performance
- **Temps de build** : Optimisé selon la complexité du projet
- **Gestion des ressources** :
  - Limitation par projet pour équité
  - Allocation dynamique selon disponibilité
  - Monitoring de l'utilisation
- **Scalabilité** :
  - Architecture horizontale pour le backend
  - Queue de jobs pour gérer la charge

### SNF2 - Sécurité
- **Isolation des conteneurs** :
  - Chaque conteneur dans son propre réseau isolé
  - Pas d'accès aux autres conteneurs
  - Limitations des ressources système
- **Limitation des permissions** :
  - Conteneurs sans privilèges root
  - Accès filesystem limité
  - Réseau filtré
- **Validation des Dockerfiles** :
  - Analyse des commandes dangereuses
  - Vérification des images de base
  - Détection de patterns malveillants
- **Protection des données** :
  - Chiffrement des mots de passe (bcrypt)
  - Tokens JWT pour l'authentification
  - HTTPS obligatoire

### SNF3 - Fiabilité
- **Gestion des erreurs** :
  - Messages explicites et actionnables
  - Logging exhaustif des erreurs
  - Retry automatique pour erreurs temporaires
- **Redémarrage contrôlé** :
  - Health checks automatiques
  - Redémarrage automatique en cas de crash
  - Politique de retry configurable
- **Backup et récupération** :
  - Sauvegarde quotidienne de la base de données
  - Conservation des images Docker
  - Rollback possible en cas de problème

### SNF4 - Maintenabilité
- **Code modulaire** :
  - Architecture en microservices
  - Séparation des responsabilités
  - Tests unitaires et d'intégration
- **Documentation technique** :
  - API documentée (OpenAPI/Swagger)
  - Guide d'installation détaillé
  - Architecture et diagrammes
  - Commentaires dans le code
- **Monitoring et observabilité** :
  - Logs centralisés
  - Métriques de performance
  - Alertes automatiques

---

## 📅 Planification et Livrables

### Approche Agile - MVP
Livraison d'un Produit Minimum Viable (MVP) fonctionnel en **4 Sprints de 2 semaines** (8 semaines au total)

### Chronogramme Détaillé

#### Phase de Préparation (1 semaine)
- Finalisation du cahier des charges
- Setup de l'environnement de développement
- Configuration Git et CI/CD
- Installation du stack technique
- Création de la base de données
- Configuration de Celery et Redis

#### Sprint 1 : Fondation et Authentification (2 semaines)
**Objectifs** :
- Architecture Frontend (React/Vue.js)
- Architecture Backend (FastAPI)
- Connexion à PostgreSQL
- SF1 complète : Inscription, connexion, profil
- Design initial du Dashboard
- Tests d'authentification

**Livrables** :
- API d'authentification fonctionnelle
- Pages d'inscription et connexion
- Page de profil basique

#### Sprint 2 : Gestion de Source et Build (2 semaines)
**Objectifs** :
- SF2.1 : Upload ZIP/TAR.GZ
- SF2.2 : Intégration GitHub (lecture seule)
- SF4.1 : Build Docker basique
- Queue Celery pour builds asynchrones
- Affichage des logs de build

**Livrables** :
- Upload de projets fonctionnel
- Clone GitHub opérationnel
- Build Docker avec logs temps réel

#### Sprint 3 : Déploiement et Exposition (2 semaines)
**Objectifs** :
- SF4.2 : Lancement des conteneurs
- SF5.1 : Génération d'URL unique
- Configuration Nginx pour reverse proxy
- SF6.1 : Dashboard avec liste de projets
- Affichage des statuts (Running/Stopped/Error)

**Livrables** :
- Déploiement automatique de conteneurs
- URL unique par projet
- Dashboard fonctionnel

#### Sprint 4 : Logs et Actions de Base (2 semaines)
**Objectifs** :
- SF7.1 : Logs temps réel via WebSockets
- SF6.3 : Actions redémarrer et arrêter
- Tests d'intégration complets
- Correction de bugs
- Optimisations de performance
- Documentation utilisateur

**Livrables** :
- Système de logs complet
- Actions de gestion opérationnelles
- Application MVP testée

#### Déploiement MVP (1 semaine)
- Déploiement sur environnement de production
- Tests d'acceptation utilisateur (UAT)
- Correction des bugs critiques
- Formation des utilisateurs pilotes
- Documentation de déploiement

### Durée Totale : **10 semaines**

### Livrables Finaux

1. **Cahier des charges validé** : Document de spécifications approuvé
2. **Application web fonctionnelle** : MVP déployé et accessible
3. **Code source** :
   - Repository Git avec historique complet
   - Backend (FastAPI)
   - Frontend (React/Vue.js)
   - Scripts de déploiement
   - Configuration Docker et Nginx
4. **Documentation technique** :
   - Guide d'installation et maintenance
   - Documentation API (Swagger)
   - Diagrammes d'architecture
   - Guide de contribution
5. **Rapport de tests** :
   - Tests unitaires et d'intégration
   - Tests de builds échoués
   - Tests de charge
   - Résultats des UAT

---

## 💰 Budget

### Estimation Budgétaire (Projet Académique)

| Poste de Dépense | Description | Coût Estimé (FCFA) | Notes |
|------------------|-------------|-------------------|--------|
| **Infrastructure Cloud (MVP)** | Hébergement serveur de production (VPS/Cloud) pour 10 semaines | 100 000 | VPS de base : 4vCPU, 8Go RAM |
| **Nom de Domaine** | Achat et configuration d'un domaine (ex: deployhub.io) | 15 000 | Pour exposition des applications (SF5.1) |
| **Ressources Humaines** | Développement (1 personne, 10 semaines, 50 jours ouvrés) | 1 000 000 | Base académique, frais de subsistance et outils |
| **Licences Logicielles** | IDE, outils de collaboration | 0 | Outils gratuits/Open Source |
| **Tests et Qualité** | Tests automatisés, monitoring | 150 000 | Outils de monitoring et temps de test |
| **Divers/Imprévus** | Marge de sécurité | 100 000 | Dépenses non prévues |
| **TOTAL ESTIMÉ** | | **1 365 000 FCFA** | **~2 082 USD** |

### Répartition du Budget
- Infrastructure : 8,4% (115 000 FCFA)
- Développement : 73,3% (1 000 000 FCFA)
- Tests et Qualité : 11% (150 000 FCFA)
- Imprévus : 7,3% (100 000 FCFA)

### Notes Budgétaires
- Budget adapté à un contexte académique
- Utilisation maximale de technologies Open Source
- Infrastructure minimale pour MVP
- Possibilité d'extension post-MVP avec budget additionnel

---

## 📊 Indicateurs de Succès

### Métriques Techniques
- ✅ Temps moyen de déploiement < 5 minutes
- ✅ Taux de succès des builds > 85%
- ✅ Disponibilité de la plateforme > 95%
- ✅ Temps de réponse API < 200ms

### Métriques Utilisateur
- ✅ 20+ projets déployés pendant la phase pilote
- ✅ Satisfaction utilisateur > 4/5
- ✅ Taux d'adoption par les étudiants IFRI > 30%

### Métriques Pédagogiques
- ✅ Documentation complète et utilisable
- ✅ Code commenté et maintenable
- ✅ Architecture extensible pour évolutions futures
- ✅ Respect des bonnes pratiques DevOps

---

## 🔮 Perspectives d'Évolution (Post-MVP)

### Fonctionnalités Avancées
- Configuration avancée des ressources (CPU, RAM)
- Support de Docker Compose multi-conteneurs
- Webhooks GitHub pour déploiement automatique
- Domaines personnalisés avec SSL
- Rollback vers versions précédentes
- Scaling horizontal automatique
- Base de données managées (PostgreSQL, MongoDB)
- Variables d'environnement chiffrées
- Collaboration en équipe (partage de projets)
- Marketplace de templates Docker

### Améliorations Techniques
- Migration vers Kubernetes pour orchestration
- Mise en cache des layers Docker
- CDN pour assets statiques
- Monitoring avancé (Prometheus, Grafana)
- Alerting proactif
- Backup automatique des données utilisateur

### Modèle Économique
- Version gratuite pour étudiants
- Plans premium pour équipes
- Support entreprise
- SLA garantis

---

## 📞 Contacts et Support

### Équipe Projet
- **Email général** : deployhub.ifri@uac.bj
- **Superviseur** : Dr. John AOGA - john.aoga@uac.bj

### Ressources
- **Documentation** : https://docs.deployhub.io
- **Repository GitHub** : https://github.com/ifri-uac/deployhub
- **Issue Tracker** : https://github.com/ifri-uac/deployhub/issues

---

## 📄 Licence et Propriété Intellectuelle

Projet académique réalisé dans le cadre du Master 2 Génie Logiciel à l'IFRI-UAC.
Tous droits réservés © 2025-2026 Équipe DeployHub - IFRI-UAC

---

**Document Version** : 1.0  
**Date de création** : Février 2026  
**Dernière mise à jour** : Février 2026