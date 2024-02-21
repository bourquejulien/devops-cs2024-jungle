FROM node:20-alpine AS base
EXPOSE 3000

ENV NODE_ENV=production

RUN apk --no-cache add curl

WORKDIR /app
COPY ./package*.json ./

RUN npm ci --quiet --only=production

RUN chown -R node:node /app

FROM node:20 AS build

WORKDIR /build
COPY ./package*.json ./

RUN npm ci --quiet

COPY . .

RUN npm run build

FROM base AS final
COPY --chown=node:node --from=build /build/dist ./dist
COPY --chown=node:node passwords_hashed.txt .
USER node

ENTRYPOINT ["node", "dist/main.js"]

FROM build AS lint
ENTRYPOINT ["npm", "run", "lint"]
