#!/bin/sh
set -e

# Valores por defecto: localhost si no se pasan variables de entorno
BACKEND_HOST="${BACKEND_HOST:-127.0.0.1}"
BACKEND_PORT="${BACKEND_PORT:-5000}"
export BACKEND_HOST BACKEND_PORT

# Sustituye SOLO las variables del backend — las $variables de Nginx ($host, $remote_addr, etc.) quedan intactas
envsubst '${BACKEND_HOST} ${BACKEND_PORT}' \
    < /etc/nginx/templates/default.conf.template \
    > /etc/nginx/conf.d/default.conf

# Validar config antes de iniciar
nginx -t

exec nginx -g "daemon off;"
