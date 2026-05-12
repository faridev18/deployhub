# Étape 1 : build Vite
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --silent
COPY . .
# VITE_API_URL injecté à build time via ARG
ARG VITE_API_URL=http://localhost:8000
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Étape 2 : serveur Nginx pour les fichiers statiques
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Config Nginx : redirige toutes les routes vers index.html (SPA)
RUN printf 'server {\n  listen 80;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}\n' \
    > /etc/nginx/conf.d/default.conf
EXPOSE 80
