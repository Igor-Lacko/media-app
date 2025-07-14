#!/bin/bash
# Installs or runs the application

# Stops the app
OnAppFinish() {
    echo "Stopping the application..."
    docker-compose down
    echo "Application stopped."
}

if [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
    echo "Usage: media-app.sh [--no-sandbox]"
    echo "Starts the media application. Use --no-sandbox to run Electron without sandboxing."
    exit 0
fi

# Trap Ctrl+C to compose down
trap 'OnAppFinish' EXIT

# Run frontend and backend
docker-compose up -d

# Run electron
cd src/electron || (echo "Failed to change directory to src/electron" && exit 1)
if [ "$1" == "--no-sandbox" ]; then 
    npm run no-sandbox
else
    npm run dev
fi