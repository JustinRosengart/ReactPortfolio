#!/bin/bash

# Deployment script for justinr.de portfolio website
# This script should be placed on your VPS

set -e

# Configuration
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/justinr.de}"
NGINX_CONFIG_PATH="${NGINX_CONFIG_PATH:-/etc/nginx/sites-available/justinr.de}"
DOMAIN="${DOMAIN:-justinr.de}"
STAGING_DOMAIN="${STAGING_DOMAIN:-staging.justinr.de}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   error "This script should not be run as root for security reasons"
fi

# Function to setup nginx configuration
setup_nginx() {
    log "Setting up Nginx configuration..."
    
    sudo tee "$NGINX_CONFIG_PATH" > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Redirect HTTP to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    # SSL configuration (adjust paths as needed)
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Root directory
    root $DEPLOY_PATH;
    index index.html index.htm;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Handle React Router (SPA)
    location / {
        try_files \$uri \$uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Security: deny access to sensitive files
    location ~ /\.(ht|git) {
        deny all;
    }
}

# Staging server configuration
server {
    listen 80;
    listen [::]:80;
    server_name $STAGING_DOMAIN;
    
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $STAGING_DOMAIN;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    # Basic auth for staging (optional)
    # auth_basic "Staging Environment";
    # auth_basic_user_file /etc/nginx/.htpasswd;

    root ${DEPLOY_PATH}_staging;
    index index.html index.htm;

    # Handle React Router (SPA)
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

    # Enable site
    sudo ln -sf "$NGINX_CONFIG_PATH" /etc/nginx/sites-enabled/
    
    # Test nginx configuration
    sudo nginx -t
    
    log "Nginx configuration created successfully"
}

# Function to setup directories
setup_directories() {
    log "Setting up deployment directories..."
    
    sudo mkdir -p "$DEPLOY_PATH"
    sudo mkdir -p "${DEPLOY_PATH}_staging"
    
    # Set ownership
    sudo chown -R www-data:www-data "$DEPLOY_PATH"
    sudo chown -R www-data:www-data "${DEPLOY_PATH}_staging"
    
    # Set permissions
    sudo chmod -R 755 "$DEPLOY_PATH"
    sudo chmod -R 755 "${DEPLOY_PATH}_staging"
    
    log "Directories created successfully"
}

# Function to setup SSL with Let's Encrypt
setup_ssl() {
    log "Setting up SSL certificates..."
    
    # Install certbot if not present
    if ! command -v certbot &> /dev/null; then
        sudo apt update
        sudo apt install -y certbot python3-certbot-nginx
    fi
    
    # Obtain SSL certificate
    sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" -d "$STAGING_DOMAIN" --non-interactive --agree-tos --email "admin@$DOMAIN"
    
    # Setup auto-renewal
    if ! sudo crontab -l | grep -q "certbot renew"; then
        (sudo crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | sudo crontab -
    fi
    
    log "SSL certificates configured successfully"
}

# Main setup function
main() {
    log "Starting deployment setup for $DOMAIN..."
    
    # Update system packages
    log "Updating system packages..."
    sudo apt update
    sudo apt upgrade -y
    
    # Install required packages
    log "Installing required packages..."
    sudo apt install -y nginx rsync
    
    # Setup directories
    setup_directories
    
    # Setup nginx
    setup_nginx
    
    # Setup SSL
    setup_ssl
    
    # Restart nginx
    sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    log "Deployment setup completed successfully!"
    log "Your website will be available at: https://$DOMAIN"
    log "Staging environment will be available at: https://$STAGING_DOMAIN"
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi