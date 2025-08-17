#!/bin/bash

cd -- "$( dirname -- "${BASH_SOURCE[0]}" )"/.. &> /dev/null || {
	echo "Failed to change directory to the project's root directory"
	exit 1
}

install_dir_packages() {
	dirpath="$1"
	dirname="$2"

	echo "Install $dirname packages? (y/n)"
	read -r install_choice
	if [[ "$install_choice" == "y" || "$install_choice" == "Y" ]]; then
		if [ -d "$dirpath" ]; then
			echo "Installing packages in $dirname..."
			CURRENT_DIR=$(pwd)
			cd "$dirpath" || {
				echo "Failed to change directory to $dirpath"
				exit 1
			}
			if ! npm install; then
				echo "Failed to install packages in $dirname"
				exit 1
			fi
			echo "Packages installed successfully in $dirname."
			cd "$CURRENT_DIR" || {
				echo "Failed to return to the original directory"
				exit 1
			}
		else
			echo "Directory $dirname does not exist, skipping package installation."
		fi
	else
		echo "Skipping package installation for $dirname."
	fi
}

install_dir_packages "." "root"
install_dir_packages "src/api" "API"
install_dir_packages "src/ui" "UI"
install_dir_packages "src/electron" "Electron"