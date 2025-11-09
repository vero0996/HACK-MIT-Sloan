#!/bin/bash

# Start ngrok tunnel with static domain
# This script automatically sets up ngrok if needed

NGROK_TOKEN="34ZuL2MbrswnXvlte6d6JXlGU18_79i8SQ5jFyATjVE6ZyiQJ"
NGROK_DOMAIN="unchalked-arboreally-chase.ngrok-free.dev"
API_PORT="5074"

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "Error: ngrok is not installed."
    echo "Please run: ./setup-ngrok.sh first"
    exit 1
fi

# Check if ngrok token is configured, if not, configure it
if ! ngrok config check &> /dev/null; then
    echo "Configuring ngrok token..."
    ngrok config add-authtoken "$NGROK_TOKEN" 2>/dev/null
fi

echo "Starting ngrok tunnel on localhost:$API_PORT..."
echo "Public URL: https://$NGROK_DOMAIN"
echo ""

# Start ngrok tunnel with static domain (tunnels to localhost)
ngrok http localhost:$API_PORT --domain=$NGROK_DOMAIN > /dev/null 2>&1 &

# Wait a moment for ngrok to start
sleep 3

# Check if ngrok started successfully
if ! pgrep -f "ngrok http" > /dev/null; then
    echo "Warning: ngrok may not have started. Continuing anyway..."
fi

# Start the API
echo "Starting API on localhost:$API_PORT..."
cd "$(dirname "$0")"
dotnet run

