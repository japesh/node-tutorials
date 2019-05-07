FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --production

COPY ./dist ./dist

EXPOSE 3000

# ENV http_proxy host:port
# ENV https_proxy host:port

CMD [ "npm", "run", "start:prod" ]