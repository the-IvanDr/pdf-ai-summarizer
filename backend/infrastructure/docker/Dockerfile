FROM node:18.18.0-alpine

RUN mkdir -p /usr/src/app && \
    chown -R node:node /usr/src/app 

WORKDIR /usr/src/app

USER node

COPY --chown=node:node . .

RUN npm ci

RUN npm run build

ENV PORT=3000
EXPOSE $PORT

CMD ["node", "dist/main.js"]