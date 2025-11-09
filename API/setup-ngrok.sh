#!/bin/bash

# Setup script for ngrok - Run this once on each computer
# This configures ngrok with the shared token

NGROK_TOKEN="34ZuL2MbrswnXvlte6d6JXlGU18_79i8SQ5jFyATjVE6ZyiQJ"
NGROK_DOMAIN="unchalked-arboreally-chase.ngrok-free.dev"

echo "Setting up ngrok..."
echo "Configuring ngrok with shared token..."

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null; then
    echo "Error: ngrok is not installed."
    echo "Please install ngrok first:"
    echo "  macOS: brew install ngrok/ngrok/ngrok"
    echo "  Or download from: https://ngrok.com/download"
    exit 1
fi

# Configure ngrok with the token
ngrok config add-authtoken "$NGROK_TOKEN"

if [ $? -eq 0 ]; then
    echo "✓ ngrok token configured successfully!"
    echo "✓ Domain: $NGROK_DOMAIN"
    echo ""
    echo "You can now run the API with: ./start-ngrok.sh"
else
    echo "Error: Failed to configure ngrok token"
    exit 1
fi

