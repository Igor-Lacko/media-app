#!/bin/bash
# Installs or runs the application

# Stops the app
OnAppFinish() {
    echo "Stopping the application..."
    docker-compose down
    echo "Application stopped."
}

# Checks if a package is installed
IsPackageInstalled() {
    if dpkg -l | grep -q "$1"; then
        return 0
    else
        return 1
    fi
}

# Trap Ctrl+C to compose down
trap 'OnAppFinish' INT

# Install electron if not installed
cd src/electron || (echo "Failed to change directory to src/electron" && exit 1)
if ! (npm list electron | grep -q 'electron@'); then
    echo "Installing electron..."
    npm install
    echo "Electron installed."
fi

# Run frontend and backend
cd ../.. && docker compose up -d

# Run electron
echo "Running electron..."
cd src/electron || (echo "Failed to change directory to src/electron" && exit 1)
npm run dev