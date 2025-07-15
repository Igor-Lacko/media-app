# Node version
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files
COPY src/api/package.json ./api/package.json
COPY src/api/package-lock.json ./api/package-lock.json

# Install dependencies
RUN cd api && npm install

# Copy the rest of the application code
COPY src/api ./api

# Copy the shared folder for types
COPY src/shared ./shared

FROM node:22-alpine

WORKDIR /app
COPY --from=builder /app .

# Change to the api directory
WORKDIR /app/api

# Generate Prisma client
RUN npx prisma generate

# Port 3000 ig
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]