FROM node:22
WORKDIR /app

COPY src/ui/package.json ./ui/package.json
COPY src/ui/package-lock.json ./ui/package-lock.json

RUN cd ui && npm install

COPY src/ui ./ui
COPY src/shared ./shared

WORKDIR /app/ui
EXPOSE 5367
CMD ["npm", "run", "dev"]