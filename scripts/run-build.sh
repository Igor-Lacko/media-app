#!/bin/bash

# Get the ../ dirname from the script's directory
NPM_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )/..
cd "$NPM_DIR" || {
	echo "Failed to change directory to $NPM_DIR"
  	exit 1
}

# Build the API
echo "Building API..."
npm run build:api

# Build the UI
echo "Building UI..."
npm run build:ui

# Run electron
echo "Starting the app..."
npm run normal