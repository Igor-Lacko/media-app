#!/bin/bash
# Installs necessary packages for electron and builds docker images for FE/BE

# Electron
cd src/electron || (echo "Failed to change directory to src/electron" && exit 1)
echo "Installing electron packages..."
npm install

# FE/BE Docker images
cd ../..
echo "Building docker image..."
docker-compose build --no-cache
read -p "Clear build cache? Don't do it if you have any docker cache you want to keep other than this from the past 30 minutes (y/n)" answer
if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
    docker builder prune --filter "until=30m" -f > /dev/null
    echo "Build cache cleared."
else
    echo "Skipping cache clear."
fi
echo "Docker image built successfully."

# Creeate run script
touch media-app.sh
cat <<EOF > media-app.sh
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
EOF

echo "Docker images build succesfully. Run 'media-app.sh' to start the application."