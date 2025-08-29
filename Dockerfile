# Phase 1: Die React-Anwendung bauen
FROM node:20-alpine as builder

WORKDIR /app

# Abhängigkeiten installieren
COPY package.json package-lock.json ./
RUN npm ci

# Quellcode kopieren und die Anwendung bauen
COPY . .
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