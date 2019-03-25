<b>note</b> currently it is not supporting multi staging build so don't forget
to run following command before starting build with docker

```
npm run build
```

# Create Docker File

crete an empty file name DockerFile

```
touch Dockerfile
```
Write following code in the docker file

```
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

COPY ./dist ./dist

EXPOSE 3000

# ENV http_proxy host:port
# ENV https_proxy host:port

CMD [ "npm", "run", "start:prod" ]
```

# Creating Image and container
- build image
  ```
  docker build -t <your username>/node-web-app .
  ```

- run image in container 
  ```
  docker run -p 49160:3000 -d japesh/node-tutorials
  ```
- (container ID) Get information of current running container 
  ```
  docker ps
  ```
- Check logs
  ```
  docker logs <container id>
  ```
- remove container (you can remove old container)
  ```
  docker rm <container id>
  ```
- remove images (you can remove old images).
  ```
  docker rmi <image id>
  ```
- To explore the running container (you can check files and folders in the container)
  ```
  docker exec -it <container id> /bin/bash
  ```