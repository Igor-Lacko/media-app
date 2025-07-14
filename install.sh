#!/bin/bash
# Installs necessary packages
#todo install npm or docker-compose if missing
cd src/electron || (echo "Failed to change directory to src/electron" && exit 1)
echo "Installing electron packages..."
npm install
cd ../..
echo "Building docker image..."
docker-compose up --build --no-cache
echo "Docker image built successfully. Run bash media-player.sh to start the application."