#!/bin/bash
# Installs or runs the application

# Stops the app
OnAppFinish() {
    echo "Stopping the application..."
    docker-compose down
    echo "Application stopped."
}

# Trap Ctrl+C to compose down
trap 'OnAppFinish' INT

# Run frontend and backend
docker-compose up -d

# Run electron
echo "Running electron..."
cd src/electron || (echo "Failed to change directory to src/electron" && exit 1)
npm run dev