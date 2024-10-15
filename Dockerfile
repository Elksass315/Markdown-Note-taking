FROM node:lts-alpine
ENV "jwtPrivateKey": "onooo"
RUN mkdir -p /usr/src/tmp && chown -R node:node /usr/src/tmp
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["node", "index.js"]
