# syntax=docker/dockerfile:1.4

# Use pinned versions for reproducibility
ARG PYTHON_VERSION=3.10.14
ARG NODE_VERSION=18.19.0

# Build arguments
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION=1.0.0

# -----------------------------
# Stage 1: Builder
# -----------------------------
FROM python:${PYTHON_VERSION}-slim AS builder

# Labels for image metadata
LABEL org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.authors="CPR Chatbot Team" \
      org.opencontainers.image.url="https://github.com/nightingale-lifesaver-cpr" \
      org.opencontainers.image.source="https://github.com/nightingale-lifesaver-cpr" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.vendor="Nightingale" \
      org.opencontainers.image.title="CPR Chatbot" \
      org.opencontainers.image.description="Production-ready CPR Chatbot with Rasa and Analytics"

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /build

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3-dev \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY ./cpr-chatbot/requirements.txt .
RUN pip install --upgrade pip setuptools wheel \
    && pip install -r requirements.txt

COPY ./cpr-chatbot ./src/rasa

# Note: Model training happens separately in production pipeline
# Pre-trained models should be committed to the repository or mounted at runtime


# =============================
# Stage 2: Runtime Base
# =============================
FROM python:${PYTHON_VERSION}-slim as runtime-base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH" \
    PYTHONPATH="/app/src/rasa:$PYTHONPATH"

WORKDIR /app

# Install runtime dependencies and create non-root user
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    bash \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/* \
    && useradd -m -u 1100 -s /bin/bash appuser \
    && mkdir -p /var/log /var/cache/app \
    && chown -R appuser:appuser /app /var/log /var/cache/app

# Copy Python virtual environment from builder
COPY --from=builder --chown=appuser:appuser /opt/venv /opt/venv

# Copy Rasa models and data from builder
COPY --from=builder --chown=appuser:appuser /build/src/rasa ./src/rasa


# =============================
# Stage 3: Final Production Image
# =============================
FROM runtime-base as production

# Copy analytics application
COPY --chown=appuser:appuser ./cpr-chatbot-intent-generator/package*.json ./src/analytics/
RUN cd src/analytics && npm ci --only=production

COPY --chown=appuser:appuser ./cpr-chatbot-intent-generator ./src/analytics

# Copy entrypoint and healthcheck scripts
COPY --chown=appuser:appuser ./entrypoint.sh /app/entrypoint.sh
COPY --chown=appuser:appuser ./healthcheck.py /app/healthcheck.py

RUN chmod +x /app/entrypoint.sh /app/healthcheck.py

# Create application directories
RUN mkdir -p /app/logs && chown -R appuser:appuser /app/logs

# Runtime configuration is loaded from ECS environment variables and secrets.
# Sensitive values must not be baked into the image.

# Switch to non-root user
USER appuser

# Health checks configuration
EXPOSE 5005 3000

# Startup health check (checks if Rasa is responding)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD ["python", "/app/healthcheck.py", "startup"]

# Entrypoint with proper signal handling
ENTRYPOINT ["/app/entrypoint.sh"]
