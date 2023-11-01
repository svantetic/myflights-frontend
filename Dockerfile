ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3001

ENV NODE_ENV=production

WORKDIR /src

FROM base as build

COPY package.json package-lock.json .
RUN npm install --production=false

COPY . .

RUN npm run build
RUN npm prune

FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs"]
