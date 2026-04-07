# Phase 1: Die React-Anwendung bauen
FROM node:20-alpine as builder

# Erhöhe den Memory-Limit für Node.js (hilfreich bei kleinen Runnern)
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# Abhängigkeiten installieren
COPY package.json package-lock.json ./
RUN npm ci --no-audit --prefer-offline

# Quellcode kopieren und die Anwendung bauen
COPY . .

# Build-Argumente für Supabase aus der CI/CD-Pipeline übernehmen
ARG REACT_APP_SUPABASE_URL
ENV REACT_APP_SUPABASE_URL=$REACT_APP_SUPABASE_URL

ARG REACT_APP_SUPABASE_ANON_KEY
ENV REACT_APP_SUPABASE_ANON_KEY=$REACT_APP_SUPABASE_ANON_KEY

ARG CI
ENV CI=$CI

RUN npm run build

# Phase 2: Die gebaute Anwendung mit Nginx servieren
FROM nginx:stable-alpine

# Die gebauten Dateien aus der "builder"-Phase übernehmen
COPY --from=builder /app/build /usr/share/nginx/html

# Eine eigene Nginx-Konfiguration für React-Router kopieren
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port 80 im Container freigeben
EXPOSE 80

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]