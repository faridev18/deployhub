# DeployHub

Plateforme d'auto-hébergement de déploiements Docker — alternative légère à Heroku/Vercel.

Fournissez un dépôt GitHub ou une archive ZIP contenant un `Dockerfile`, DeployHub clone, build et lance votre application automatiquement dans un container Docker isolé.

---

## Stack

| Couche | Technologies |
|---|---|
| Backend | FastAPI · SQLAlchemy · Alembic · Celery · Redis |
| Containers | Docker SDK · GitPython |
| Auth | JWT (python-jose) · bcrypt |
| Frontend | React 19 · Vite · Tailwind CSS v4 · Axios |

---

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et **démarré**
- C'est tout.

---

## Lancement

```bash
git clone <url-du-repo>
cd deployhub
docker compose up --build
```

Première fois : le build prend 2–3 minutes (téléchargement des images, installation des dépendances).

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API REST | http://localhost:8000 |
| Swagger UI | http://localhost:8000/docs |

---

## Utilisation rapide

1. Rendez-vous sur **http://localhost:5173/register** pour créer un compte
2. Le token de confirmation email s'affiche dans les **logs du container backend** :
   ```bash
   docker compose logs backend | grep "confirm"
   ```
3. Confirmez via **http://localhost:5173/confirm-email?token=\<token\>**
4. Connectez-vous et accédez au **Dashboard**
5. Créez un projet depuis un dépôt GitHub ou un ZIP contenant un `Dockerfile`

---

## Déploiement sur un serveur distant

Remplacez `localhost` par l'IP ou le domaine de votre serveur :

```bash
HOST=mon-serveur.com docker compose up --build -d
```

---

## Structure du projet

```
deployhub/
├── docker-compose.yml        # Orchestration complète
├── deployhub-back/           # API FastAPI + Celery worker
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── api/              # Routes REST (auth, deployments)
│       ├── core/             # Config, DB, sécurité, Celery
│       ├── crud/             # Accès base de données
│       ├── models/           # SQLAlchemy (User, Deployment, Build)
│       ├── schemas/          # Pydantic
│       ├── services/         # Logique Docker (build, run, logs)
│       └── tasks/            # Tâches Celery asynchrones
└── deployhub-front/          # SPA React
    ├── Dockerfile
    └── src/
        ├── api/              # Client axios (auth, deployments)
        ├── contexts/         # AuthContext
        ├── components/       # Layout, Button, Card, Badge...
        └── pages/            # Dashboard, CreateProject, ProjectDetail...
```

---

## Arrêter / Supprimer

```bash
# Arrêter
docker compose down

# Arrêter et supprimer les données
docker compose down -v
```
