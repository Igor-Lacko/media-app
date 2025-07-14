#!/bin/bash
# Installs necessary packages
#todo install npm or docker-compose if missing

# Electron
cd src/electron || (echo "Failed to change directory to src/electron" && exit 1)
echo "Installing electron packages..."
npm install

# FE/BE Docker images
cd ../..
echo "Building docker image..."
docker-compose build --no-cache
echo "Docker image built successfully. Run bash media-player.sh to start the application."