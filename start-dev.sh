#!/usr/bin/env bash
# ============================================================
# DeployHub — lancement local (sans Docker pour le backend)
# Prérequis : Python 3.11+, Node 18+, Redis en cours (ou Docker)
# ============================================================
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
BACK="$ROOT/deployhub-back"
FRONT="$ROOT/deployhub-front"

# ── 1. Redis via Docker si non disponible ──────────────────
if ! redis-cli ping &>/dev/null 2>&1; then
  echo "[redis] Démarrage via Docker..."
  docker run -d --name deployhub-redis -p 6379:6379 redis:7-alpine
else
  echo "[redis] Déjà disponible"
fi

# ── 2. Backend : venv + deps + migrations + uvicorn ────────
echo "[backend] Installation des dépendances..."
cd "$BACK"
[ ! -d ".venv" ] && python -m venv .venv
source .venv/Scripts/activate 2>/dev/null || source .venv/bin/activate

pip install -q -r requirements.txt

echo "[backend] Migrations Alembic..."
# Génère la première révision si aucune n'existe
if [ -z "$(ls alembic/versions/*.py 2>/dev/null)" ]; then
  alembic revision --autogenerate -m "init"
fi
alembic upgrade head

echo "[backend] Démarrage uvicorn sur :8000..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACK_PID=$!

# ── 3. Celery worker ────────────────────────────────────────
echo "[worker] Démarrage Celery..."
celery -A app.core.celery_app worker -Q deployments -c 2 --loglevel=info &
WORKER_PID=$!

# ── 4. Frontend ─────────────────────────────────────────────
echo "[frontend] Installation npm..."
cd "$FRONT"
npm install --silent

echo "[frontend] Démarrage Vite sur :5173..."
npm run dev &
FRONT_PID=$!

# ── Nettoyage sur Ctrl+C ────────────────────────────────────
trap "echo 'Arrêt...'; kill $BACK_PID $WORKER_PID $FRONT_PID 2>/dev/null" INT TERM

echo ""
echo "  Backend  → http://localhost:8000"
echo "  API docs → http://localhost:8000/docs"
echo "  Frontend → http://localhost:5173"
echo ""
wait
