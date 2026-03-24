# Production Deployment Guide

## Overview
This application is now production-ready with comprehensive health checks, structured logging, and environment-based configuration.

## Key Improvements

### 1. **Health Checks** (`healthcheck.py`)
- **Startup Check**: Verifies Rasa API is responding
- **Readiness Check**: Ensures both Rasa and Analytics are healthy
- **Liveness Check**: Monitors ongoing service availability
- Structured JSON logging for all health check events
- Configurable timeouts and retry behavior

### 2. **Structured Logging**
- JSON-formatted logs for better parsing and monitoring
- Separate log files for Rasa and Analytics
- Configured log levels per service
- Docker JSON driver configured for log rotation

### 3. **Environment Configuration** (`.env.production`)
Key configuration sections:
- **Rasa Configuration**: Ports, hosts, threading, log levels
- **Analytics Configuration**: Node.js environment and logging
- **Health Check Settings**: Timeouts, intervals, retries
- **Security**: CORS origins, rate limiting (extensible)
- **Monitoring**: Prometheus metrics, Jaeger tracing (optional)
- **Database** secrets (if applicable)

### 4. **Process Management** (`entrypoint.sh`)
- Proper signal handling (SIGTERM, SIGINT)
- Graceful shutdown with 30-second timeout
- Structured logging for startup sequence
- Environment variable injection at runtime
- Non-zero exit codes for failures

### 5. **Security Enhancements**
- Non-root user (appuser, UID 1000) for container execution
- Pinned base image versions for reproducibility
- `no-new-privileges` security option
- Proper file permissions (chown to appuser)

### 6. **Docker Compose Configuration** (`docker-compose.production.yml`)
- Resource limits and reservations
- Logging driver with rotation (100MB, 3 files)
- Automatic restart policy
- Comprehensive health check configuration
- Custom Docker network with defined subnet

## Usage

### Build the image:
```bash
docker build \
  --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg VCS_REF=$(git rev-parse --short HEAD) \
  --build-arg VERSION=1.0.0 \
  -t cpr-chatbot:1.0.0 \
  .
```

### Run with Docker Compose:
```bash
docker-compose -f docker-compose.production.yml up -d
```

### Run with custom environment:
```bash
docker run -d \
  --env-file .env.production \
  -p 5005:5005 \
  -p 3000:3000 \
  -v ./logs:/app/logs \
  --name cpr-chatbot \
  cpr-chatbot:1.0.0
```

## Monitoring

### Check health status:
```bash
docker ps  # View container status and health
docker exec cpr-chatbot python /app/healthcheck.py readiness
docker exec cpr-chatbot python /app/healthcheck.py liveness
```

### View logs:
```bash
# Rasa logs (inside container)
tail -f /var/log/rasa.log

# Analytics logs (inside container)
tail -f /var/log/analytics.log

# Docker container logs
docker logs -f cpr-chatbot
```

### Structured log parsing (example with jq):
```bash
docker logs cpr-chatbot | jq 'select(.level == "ERROR")'
```

## Configuration

### Environment Variables
Edit `.env.production` to customize:
- Service ports and hosts
- Log levels and formats
- Health check parameters
- CORS origins
- Database connections (if applicable)
- Monitoring endpoints

### Health Check Customization
Modify in Dockerfile:
```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3
```

- `interval`: Check frequency
- `timeout`: Maximum time for check script
- `start-period`: Grace period during startup
- `retries`: Failures before marking unhealthy

## Deployment Best Practices

1. **Use docker-compose.production.yml** for orchestrated deployment
2. **Set resource limits** to prevent runaway containers
3. **Configure log rotation** to manage disk space
4. **Enable monitoring** (Prometheus metrics, distributed tracing)
5. **Use secrets management** for sensitive environment variables
6. **Test health checks** before production deployment
7. **Set up alerting** on health check failures

## Kubernetes Readiness (Optional)

For Kubernetes deployments, the health check script can be adapted:

```yaml
livenessProbe:
  exec:
    command:
      - python
      - /app/healthcheck.py
      - liveness
  initialDelaySeconds: 40
  periodSeconds: 30
  timeoutSeconds: 10
  failureThreshold: 3

readinessProbe:
  exec:
    command:
      - python
      - /app/healthcheck.py
      - readiness
  initialDelaySeconds: 40
  periodSeconds: 10
  timeoutSeconds: 10
  failureThreshold: 1
```

## Troubleshooting

**Container exits immediately:**
- Check `/var/log/rasa.log` for Rasa errors
- Check `/var/log/analytics.log` for Analytics errors
- Verify environment variables are set correctly

**Health check failures:**
- Ensure ports 5005 and 3000 are accessible
- Check service startup logs
- Verify network connectivity between services

**Permission denied errors:**
- Verify entrypoint.sh is executable
- Check file ownership (should be appuser:appuser)
- Review volume mount permissions
