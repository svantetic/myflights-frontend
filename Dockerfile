FROM node:16-alpine

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . .

RUN npm ci && npm cache clean --force
RUN npm run build

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3021

EXPOSE 3021 

ENTRYPOINT ["node", ".output/server/index.mjs"]
