#!/bin/bash

# Einrichtungs-Skript für den vServer (HTTP-Only für Cloudflare + Deploy-Benutzer)
# Dieses Skript richtet den Server mit einem dedizierten 'gitlab-deploy'-Benutzer ein.

set -e

# --- Konfiguration ---
# HIER DEINEN ÖFFENTLICHEN SSH-SCHLÜSSEL EINTRAGEN
GITLAB_PUBLIC_KEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFTw/pOktnPLJYGFjOwUtxwaeyVdl2IpcS24lZYop6a6 gitlab-deploy@justinr.de"

# Weitere Konfigurationen
DOMAIN="${DOMAIN:-justinr.de}"
DEPLOY_USER="gitlab-deploy" # Fester Benutzer für Deployments
DEPLOY_PATH="/var/www/${DOMAIN}"
NGINX_CONFIG_PATH="/etc/nginx/sites-available/${DOMAIN}"

# --- Farben für die Ausgabe ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# --- Hilfsfunktionen ---
log() { echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"; }
warn() { echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNUNG: $1${NC}"; }
error() { echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] FEHLER: $1${NC}"; exit 1; }

# --- Skript-Logik ---

# Funktion zur Erstellung des Deploy-Benutzers
setup_deploy_user() {
    log "Erstelle Deployment-Benutzer '$DEPLOY_USER'..."
    if id "$DEPLOY_USER" &>/dev/null; then
        log "Benutzer '$DEPLOY_USER' existiert bereits."
    else
        # Benutzer ohne Passwort und mit Home-Verzeichnis erstellen
        sudo useradd -m -s /bin/bash -d "/home/$DEPLOY_USER" "$DEPLOY_USER"
        log "Benutzer '$DEPLOY_USER' erfolgreich erstellt."
    fi

    log "Richte SSH-Zugang für '$DEPLOY_USER' ein..."
    # SSH-Verzeichnis erstellen
    sudo mkdir -p "/home/$DEPLOY_USER/.ssh"
    # Public Key in authorized_keys schreiben
    echo "$GITLAB_PUBLIC_KEY" | sudo tee "/home/$DEPLOY_USER/.ssh/authorized_keys" > /dev/null
    # Korrekte Berechtigungen setzen
    sudo chmod 700 "/home/$DEPLOY_USER/.ssh"
    sudo chmod 600 "/home/$DEPLOY_USER/.ssh/authorized_keys"
    # Eigentümer auf den neuen Benutzer setzen
    sudo chown -R "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
    log "SSH-Zugang erfolgreich konfiguriert."
}

# Funktion zur Installation der Abhängigkeiten
install_dependencies() {
    log "Aktualisiere Paketquellen..."
    sudo apt-get update
    log "Installiere benötigte Pakete (nginx, docker, docker-compose)..."
    sudo apt-get install -y nginx curl

    if ! command -v docker &> /dev/null; then
        log "Installiere Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        rm get-docker.sh
    fi
    # Füge den neuen Deploy-Benutzer zur Docker-Gruppe hinzu
    log "Füge '$DEPLOY_USER' zur Docker-Gruppe hinzu..."
    sudo usermod -aG docker "$DEPLOY_USER"

    if ! command -v docker-compose &> /dev/null; then
        log "Installiere Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi
}

# Funktion zur Einrichtung der Verzeichnisse
setup_directories() {
    log "Richte Deployment-Verzeichnis ein: $DEPLOY_PATH"
    sudo mkdir -p "$DEPLOY_PATH"
    # Setze den Deploy-Benutzer als Eigentümer
    sudo chown -R "$DEPLOY_USER:$DEPLOY_USER" "$DEPLOY_PATH"
    sudo chmod -R 755 "$DEPLOY_PATH"
    log "Verzeichnis erfolgreich eingerichtet."
}

# Nginx-Konfiguration (unverändert)
setup_nginx() {
    log "Richte Nginx-Konfiguration als HTTP-Reverse-Proxy ein..."
    sudo tee "$NGINX_CONFIG_PATH" > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
    log "Aktiviere die Nginx-Seite..."
    sudo ln -sf "$NGINX_CONFIG_PATH" /etc/nginx/sites-enabled/
    sudo nginx -t
    log "Nginx-Konfiguration erfolgreich erstellt."
}

# Hauptfunktion
main() {
    log "Starte die Server-Einrichtung für $DOMAIN..."
    if [[ $EUID -eq 0 ]]; then
       error "Dieses Skript sollte nicht als root, sondern mit einem sudo-fähigen Benutzer ausgeführt werden."
    fi
    if [[ "$GITLAB_PUBLIC_KEY" == *"dein-öffentlicher-schlüssel"* ]]; then
        error "Bitte trage deinen öffentlichen SSH-Schlüssel in die Variable 'GITLAB_PUBLIC_KEY' im Skript ein."
    fi

    setup_deploy_user
    install_dependencies
    setup_directories
    setup_nginx

    log "Starte und aktiviere Nginx..."
    sudo systemctl restart nginx
    sudo systemctl enable nginx

    log "✅ Server-Einrichtung abgeschlossen!"
    warn "WICHTIG: Aktualisiere die Variable '\$SERVER_USER' in deinen GitLab CI/CD-Einstellungen zu '$DEPLOY_USER'."
}

# Führe die main-Funktion aus
main "$@"