# BUILD STEP
FROM node:16.7.0-alpine as build

WORKDIR /app
ADD ./package.json .
ADD ./src ./src
ADD ./.babelrc ./
RUN npm install
ADD ./dist ./dist
# RUN npm run build

# CREATE IMAGE STEP
FROM node:16.7.0-alpine
LABEL maintainer="Pelsoft SF by @moviedo"

# RUN npm install pm2@3.5.1 -g

WORKDIR /app

# copia los archivos compilados y node_modules
COPY --from=build /app/dist .
COPY --from=build /app/node_modules ./node_modules

# copia pm2.json y .env
# ADD ./pm2.json .
ADD ./.env.production ./.env

# ENV PORT 2008
# ENV PM2_HEALTH_PORT 3001
ENV NODE_ENV production

EXPOSE ${PORT}
# EXPOSE ${PM2_HEALTH_PORT}

# CMD pm2-runtime start pm2.json --web ${PM2_HEALTH_PORT}
CMD [ "node", "dist/index.js" ]




