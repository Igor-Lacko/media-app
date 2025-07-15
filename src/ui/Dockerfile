FROM node:22-alpine AS builder
WORKDIR /app

COPY src/ui/package.json ./ui/package.json
COPY src/ui/package-lock.json ./ui/package-lock.json

RUN cd ui && npm install

COPY src/ui ./ui
COPY src/shared ./shared

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app .

WORKDIR /app/ui
EXPOSE 5173
CMD ["npm", "run", "dev"]