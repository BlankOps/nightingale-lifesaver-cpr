#!/usr/bin/env python3
"""
Comprehensive health check script for the application.
Checks both Rasa API and Analytics service health.
"""

import os
import sys
import logging
import json
from typing import Dict, Tuple
import urllib.request
import urllib.error
import time

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


def check_rasa_health() -> Tuple[bool, str]:
    """Check Rasa API health."""
    rasa_url = os.getenv("RASA_API_URL", "http://localhost:5005")
    rasa_timeout = int(os.getenv("RASA_HEALTH_TIMEOUT", "5"))
    
    try:
        req = urllib.request.Request(
            f"{rasa_url}/status",
            headers={"Accept": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=rasa_timeout) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                logger.info(f"Rasa health check passed: {data}")
                return True, "Rasa API is healthy"
            else:
                return False, f"Rasa returned status {response.status}"
    except urllib.error.URLError as e:
        logger.warning(f"Rasa health check failed: {e}")
        return False, f"Rasa connection error: {str(e)}"
    except Exception as e:
        logger.error(f"Rasa health check exception: {e}")
        return False, f"Rasa error: {str(e)}"


def check_analytics_health() -> Tuple[bool, str]:
    """Check Analytics service health."""
    analytics_url = os.getenv("ANALYTICS_API_URL", "http://localhost:3000")
    analytics_timeout = int(os.getenv("ANALYTICS_HEALTH_TIMEOUT", "5"))
    
    try:
        req = urllib.request.Request(
            f"{analytics_url}/health",
            headers={"Accept": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=analytics_timeout) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                logger.info(f"Analytics health check passed: {data}")
                return True, "Analytics service is healthy"
            else:
                return False, f"Analytics returned status {response.status}"
    except urllib.error.URLError as e:
        logger.warning(f"Analytics health check failed: {e}")
        return False, f"Analytics connection error: {str(e)}"
    except Exception as e:
        logger.error(f"Analytics health check exception: {e}")
        return False, f"Analytics error: {str(e)}"


def main() -> int:
    """Run all health checks."""
    check_type = sys.argv[1] if len(sys.argv) > 1 else "startup"
    
    if check_type == "startup":
        # Startup check: only check Rasa (analytics might still be starting)
        rasa_ok, rasa_msg = check_rasa_health()
        logger.info(f"Startup health check - Rasa: {rasa_msg}")
        return 0 if rasa_ok else 1
    
    elif check_type == "readiness":
        # Readiness check: both services should be healthy
        rasa_ok, rasa_msg = check_rasa_health()
        analytics_ok, analytics_msg = check_analytics_health()
        
        logger.info(f"Readiness checks - Rasa: {rasa_msg}, Analytics: {analytics_msg}")
        return 0 if (rasa_ok and analytics_ok) else 1
    
    elif check_type == "liveness":
        # Liveness check: at least Rasa should be responding
        rasa_ok, rasa_msg = check_rasa_health()
        logger.info(f"Liveness check - Rasa: {rasa_msg}")
        return 0 if rasa_ok else 1
    
    else:
        logger.error(f"Unknown check type: {check_type}")
        return 2


if __name__ == "__main__":
    sys.exit(main())
