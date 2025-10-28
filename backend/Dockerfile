# FROM node:18-alpine

# # Install Python and dependencies for Rasa
# RUN apk add --no-cache python3 py3-pip python3-dev build-base linux-headers

# # Set work directory
# WORKDIR /app

# # Copy and install Node.js dependencies (analytics)
# COPY cpr-chatbot/analytics/package*.json ./analytics/
# RUN cd analytics && npm install

# # Copy and install Python dependencies (Rasa)
# COPY cpr-chatbot/requirements.txt ./cpr-chatbot/
# RUN cd cpr-chatbot && pip install -r requirements.txt

# # Copy all application code
# COPY cpr-chatbot ./cpr-chatbot

# # Expose ports
# EXPOSE 3000 5005

# # Start both services
# CMD ["sh", "-c", "cd cpr-chatbot && rasa run --enable-api --cors '*' --port 5005 & cd analytics && npm run dev"]


FROM node:18-bullseye

# Install Python and build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    python3-dev \
    build-essential \
    linux-headers-amd64 \
    && rm -rf /var/lib/apt/lists/*


# Set work directory
WORKDIR /app

# Copy and install Node.js dependencies (analytics)
COPY cpr-chatbot/analytics/package*.json ./analytics/
RUN cd analytics && npm install

# Copy Python requirements
COPY cpr-chatbot/requirements.txt ./cpr-chatbot/

# Create virtual environment and install Python dependencies
RUN python3 -m venv /app/venv \
    && . /app/venv/bin/activate \
    && cd cpr-chatbot \
    && pip install --upgrade pip \
    && pip install -r requirements.txt

# Copy all application code
COPY cpr-chatbot ./cpr-chatbot

# Expose ports
EXPOSE 3000 5005

# Start both services
CMD ["sh", "-c", ". /app/venv/bin/activate && cd cpr-chatbot && rasa run --enable-api --cors '*' --port 5005 & cd analytics && npm run dev"]
