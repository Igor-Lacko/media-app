#!/bin/bash

# Concurrently
npm install

# UI modules
cd ../ui || (echo "Failed to change directory to src/ui" && exit 1)
echo "Installing UI packages..."
npm install

# Electron and wait-on
cd ../electron || (echo "Failed to change directory to src/electron" && exit 1)
echo "Installing Electron packages..."
npm install

# API modules and prisma
cd src/api || (echo "Failed to change directory to src/api" && exit 1)
echo "Installing API packages..."
npm install

echo "Setting up Prisma..."
npx prisma generate
npx prisma db push

# Create run script
echo "Creating run script..."
cd ../..
touch media-app.sh

cat <<EOF > media-app.sh
#!/bin/bash
# Runs the app
npm run dev:app
EOF