#!/bin/bash

# Get the ../ dirname from the script's directory
NPM_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )/..
echo "NPM_DIR is set to: $NPM_DIR"
cd "$NPM_DIR" || {
	echo "Failed to change directory to $NPM_DIR"
  	exit 1
}

# Build the API and UI
echo "Building the API..."
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

# Ask to add an alias
echo "Do you want to create an alias for the executable? (y/n)"
read -r create_alias
if [[ "$create_alias" == "y" || "$create_alias" == "Y" ]]; then
	# Alias name
	echo "Enter the alias name (default: media-app):"
	read -r alias_name
	if [ -z "$alias_name" ]; then
		alias_name="media-app"
	fi

	# Config file
	echo "Enter your shell configuration file (e.g., bashrc, zshrc), default: bashrc:"
	echo "Note: this will search for the file in your home directory."
	read -r shell_config
	if [ -z "$shell_config" ]; then
		shell_config="bashrc"
	fi

	# Check if the file exists
	if [ ! -f "$HOME/.$shell_config" ]; then
		echo "Shell configuration file .$shell_config not found, skipping alias creation..."
		echo "Note: You can manually add the alias to your shell configuration file. Just add the following line:"
		echo "alias $alias_name=\"$EXE\""
	else
		echo "alias $alias_name=\"$EXE\"" >> "$HOME/.$shell_config"
		echo "Alias $alias_name created. Please run 'source $HOME/.$shell_config' to apply the changes (or open a new terminal)."
	fi
else
	echo "Skipping alias creation. You can run the application directly using:"
	echo "$EXE"
fi

# Delete useless node_modules
echo "Do you want to delete the node_modules directories? (y/n)"
read -r delete_node_modules
if [[ "$delete_node_modules" == "y" || "$delete_node_modules" == "Y" ]]; then
	echo "Deleting node_modules directories..."
	cd NPM_DIR || {
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