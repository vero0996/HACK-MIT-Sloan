#!/bin/bash

# Start ngrok tunnel with static domain
echo "Starting ngrok tunnel..."
ngrok http 192.168.1.5:5074 --domain=unchalked-arboreally-chase.ngrok-free.dev &

# Wait a moment for ngrok to start
sleep 2

# Start the API
echo "Starting API..."
cd "$(dirname "$0")"
dotnet run

