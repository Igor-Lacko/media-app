#!/bin/bash

# Get the ../ dirname from the script's directory
NPM_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )/..
cd "$NPM_DIR" || {
	echo "Failed to change directory to $NPM_DIR"
  	exit 1
}

# Build the API
echo "Building the API..."

# Set up prisma if needed
echo "Set up prisma? (y/n) (Run this if you are running this script for the first time or if src/api/prisma/database.db does not exist)."
read -r setup_prisma
if [[ "$setup_prisma" == "y" || "$setup_prisma" == "Y" ]]; then
	echo "Setting up prisma..."
	cd src/api || {
		echo "Failed to change directory to src/api"
		exit 1
	}
	export DATABASE_URL="file:./database.db"
	npx prisma db push
	cd ../..
	echo "Prisma set up successfully."
fi

npm run build:api

# Build the UI
echo "Building the UI..."
npm run build:ui

# Package
echo "Packaging the application..."
cd src/electron || {
	echo "Failed to change directory to src/electron"
  	exit 1
}

npm run package
ls
ls out/

OUT_DIR=$(cd "$(find out -type d -wholename "out/media-app-*" | head -n 1)" && pwd)
if [ -z "$OUT_DIR" ]; then
	echo "No output directory found."
	exit 1
fi

EXE="$OUT_DIR/media-app"

# Ask to add an symlink
echo "Do you want to create a symlink in /usr/bin for the executable? (y/n)"
read -r create_symlink
if [[ "$create_symlink" == "y" || "$create_symlink" == "Y" ]]; then
	# Symlink name
	echo "Enter the symlink name (default: media-app):"
	read -r symlink_name
	if [ -z "$symlink_name" ]; then
		symlink_name="media-app"
	fi

	sudo ln -s "$EXE" "/usr/bin/$symlink_name"
	echo "Symlink created. You can run the application using $symlink_name"
else
	echo "Skipping symlink creation. You can run the application directly using:"
	echo "$EXE"
fi

# Delete useless node_modules
echo "Do you want to delete the node_modules directories? (y/n)"
read -r delete_node_modules
if [[ "$delete_node_modules" == "y" || "$delete_node_modules" == "Y" ]]; then
	echo "Deleting node_modules directories..."
	cd "$NPM_DIR" || {
		echo "Failed to change directory to $NPM_DIR"
		exit 1
	}
	rm -rf src/api/node_modules
	rm -rf src/ui/node_modules
	rm -rf src/electron/node_modules
	rm -rf node_modules
	echo "node_modules directories deleted. If you want to reinstall them run scripts/install-packages.sh."
else
	echo "Skipping node_modules deletion. You can delete them later if you want to."
fi