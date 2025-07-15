#!/bin/bash

# Concurrently
npm install

# UI modules
cd src/ui || (echo "Failed to change directory to src/ui" && exit 1)
echo "Installing UI packages..."
npm install

# Electron and wait-on
cd ../electron || (echo "Failed to change directory to src/electron" && exit 1)
echo "Installing Electron packages..."
npm install

# API modules and prisma
cd ../api || (echo "Failed to change directory to src/api" && exit 1)
echo "Installing API packages..."
npm install
echo "All packages installed successfully"

# Prisma
echo "Setting up Prisma..."
npx prisma generate
npx prisma db push
echo "Prisma setup completed successfully"