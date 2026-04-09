#!/bin/bash
# Entrypoint script with structured logging and proper signal handling
# Coordinates startup of Rasa and Analytics services
# Assumes models are already trained and available in the image/volumes

set -e

# Setup structured logging helper
log() {
    local level=$1
    local message=$2
    echo "{\"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\", \"service\": \"entrypoint\", \"level\": \"$level\", \"message\": \"$message\"}"
}

# Load configuration from environment variables
RASA_PORT=${RASA_PORT:-5005}
RASA_HOST=${RASA_HOST:-0.0.0.0}
RASA_CWD=${RASA_CWD:-/app/src/rasa}
RASA_CORS=${RASA_CORS:-"*"}
RASA_LOG_FILE=${RASA_LOG_FILE:-/var/log/rasa.log}
RASA_LOG_LEVEL=${RASA_LOG_LEVEL:-INFO}

ANALYTICS_PORT=${ANALYTICS_PORT:-3000}
ANALYTICS_HOST=${ANALYTICS_HOST:-0.0.0.0}
ANALYTICS_DIR=${ANALYTICS_DIR:-/app/src/analytics}
ANALYTICS_LOG_FILE=${ANALYTICS_LOG_FILE:-/var/log/analytics.log}

# Create log directory if it doesn't exist
mkdir -p /var/log
mkdir -p "${RASA_CWD}"
mkdir -p "${ANALYTICS_DIR}"

# Ensure Rasa models exist
if [ ! -f "${RASA_CWD}/models.tar.gz" ] && [ ! -d "${RASA_CWD}/models" ]; then
    log "WARNING" "No trained models found in ${RASA_CWD}. Please train models before deployment."
    log "WARNING" "To train models, run: python -m rasa train --cwd ${RASA_CWD}"
fi

# Trap signals for graceful shutdown
cleanup() {
    log "INFO" "Received shutdown signal, terminating services..."
    
    # Send SIGTERM to background jobs
    jobs -p | xargs -r kill -TERM 2>/dev/null || true
    
    # Wait for services to shut down gracefully (max 30 seconds)
    for i in {1..30}; do
        if ! jobs -p | grep -q .; then
            log "INFO" "All services shut down successfully"
            break
        fi
        sleep 1
    done
    
    # Force kill any remaining processes
    jobs -p | xargs -r kill -9 2>/dev/null || true
    exit 0
}

trap cleanup SIGTERM SIGINT

log "INFO" "Starting CPR Chatbot Application (Rasa + Analytics)"
log "INFO" "Rasa config - Port: $RASA_PORT, Host: $RASA_HOST, CWD: $RASA_CWD"
log "INFO" "Analytics config - Port: $ANALYTICS_PORT, Host: $ANALYTICS_HOST"

# Start Rasa API
log "INFO" "Starting Rasa API service..."
rasa run \
    --enable-api \
    --cors "${RASA_CORS}" \
    --port "${RASA_PORT}" \
    -h "${RASA_HOST}" \
    --cwd "${RASA_CWD}" \
    --log-file "${RASA_LOG_FILE}" \
    --log-file-format "%(asctime)s - %(name)s - %(levelname)s - %(message)s" \
    >> "${RASA_LOG_FILE}" 2>&1 &
RASA_PID=$!
log "INFO" "Rasa API started with PID: $RASA_PID"

# Give Rasa time to start
sleep 3

# Start Analytics service
log "INFO" "Starting Analytics service..."
cd "${ANALYTICS_DIR}"
NODE_ENV=${NODE_ENV:-production} \
NODE_LOG_FORMAT=${NODE_LOG_FORMAT:-json} \
PORT="${ANALYTICS_PORT}" \
HOST="${ANALYTICS_HOST}" \
npm start >> "${ANALYTICS_LOG_FILE}" 2>&1 &
ANALYTICS_PID=$!
log "INFO" "Analytics service started with PID: $ANALYTICS_PID"

log "INFO" "All services started successfully"
log "INFO" "Waiting for services..."

# Wait for all background jobs and listen for signals
wait

log "ERROR" "All services have exited unexpectedly"
exit 1
