#!/usr/bin/env python3
"""
Comprehensive health check script for the application.
Checks both Rasa API and Analytics service health.
"""

import os
import sys
import logging
import json
import urllib.request
import urllib.error
from datetime import datetime

# Setup structured logging
logging.basicConfig(
    level=logging.INFO,
    format=json.dumps({
        "timestamp": "%(asctime)s",
        "service": "healthcheck",
        "level": "%(levelname)s",
        "message": "%(message)s"
    })
)
logger = logging.getLogger(__name__)

# Configuration
RASA_URL = os.getenv("RASA_API_URL", "http://localhost:5005")
ANALYTICS_URL = os.getenv("ANALYTICS_API_URL", "http://localhost:3000")
TIMEOUT = int(os.getenv("HEALTHCHECK_TIMEOUT", "5"))

def log_check(status, message, check_type):
    """Log health check result in JSON format"""
    log_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "check_type": check_type,
        "status": status,
        "message": message
    }
    print(json.dumps(log_entry))
    return status == "healthy"


def request_url(url: str) -> int:
    request = urllib.request.Request(url, headers={"User-Agent": "healthcheck"})
    with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
        return response.getcode()


def check_startup():
    """Startup check - only verify Rasa is responding"""
    try:
        status_code = request_url(f"{RASA_URL}/")
        if status_code == 200:
            return log_check("healthy", "Rasa startup check passed", "startup")
        return log_check("unhealthy", f"Rasa returned {status_code}", "startup")
    except Exception as e:
        return log_check("unhealthy", f"Rasa startup check failed: {str(e)}", "startup")

def check_readiness():
    """Readiness check - verify both Rasa and Analytics"""
    rasa_ok = False
    analytics_ok = False

    try:
        rasa_ok = request_url(f"{RASA_URL}/") == 200
    except:
        pass

    try:
        analytics_ok = request_url(f"{ANALYTICS_URL}/health") == 200
    except:
        pass

    if rasa_ok and analytics_ok:
        return log_check("healthy", "All services ready", "readiness")

    msg = f"Rasa: {rasa_ok}, Analytics: {analytics_ok}"
    return log_check("unhealthy", msg, "readiness")

def check_liveness():
    """Liveness check - verify services are running"""
    try:
        r1_ok = request_url(f"{RASA_URL}/") == 200
        r2_ok = request_url(f"{ANALYTICS_URL}/health") == 200
        if r1_ok and r2_ok:
            return log_check("healthy", "Services alive", "liveness")
    except:
        pass

    return log_check("unhealthy", "Service connectivity failed", "liveness")

if __name__ == "__main__":
    check_type = sys.argv[1] if len(sys.argv) > 1 else "startup"
    
    if check_type == "startup":
        success = check_startup()
    elif check_type == "readiness":
        success = check_readiness()
    elif check_type == "liveness":
        success = check_liveness()
    else:
        success = False
    
    sys.exit(0 if success else 1)
