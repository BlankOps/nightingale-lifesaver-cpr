#!/bin/bash
# Script to train Rasa models locally before building Docker image
# This ensures models are pre-trained and ready for production deployment

set -e

RASA_DIR="${RASA_DIR:-./cpr-chatbot}"
PYTHON_VERSION="3.10"

echo "=========================================="
echo "Rasa Model Training Script"
echo "=========================================="
echo ""

# Check if Python environment exists
if [ ! -d "$RASA_DIR/rasa310_env" ]; then
    echo "ERROR: Python virtual environment not found at $RASA_DIR/rasa310_env"
    echo "Please ensure Rasa environment is set up first."
    exit 1
fi

echo "Activating Rasa environment..."
source "$RASA_DIR/rasa310_env/bin/activate"

echo "Training Rasa model..."
cd "$RASA_DIR"

# Run Rasa training
python -m rasa train \
    --data data/ \
    --config config.yml \
    --domain domain.yml \
    --out models \
    --fixed-model-name nlu-model \
    --quiet

echo ""
echo "=========================================="
echo "✓ Model training completed successfully!"
echo "=========================================="
echo ""
echo "Models are located at: $RASA_DIR/models/"
echo ""
echo "To build the Docker image:"
echo "  docker build -t cpr-chatbot:1.0.0 ."
echo ""
