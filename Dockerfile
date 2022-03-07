# dockerfile permet de créer une image docker personnalisé. 
# Docker permet de faciliter la coordination des comportements entre conteneurs 
# et de les connecter entre eux pour créer des stacks d'applications.

# first, we define the base image on which we are create our custom image
FROM node:17-alpine3.14

# we set working directory where our react app is based
WORKDIR /tennis-score-counter

# add '/tennis-score-counter/node_modules/.bin' to $PATH
# we create a path to the node_modules on a server
ENV PATH ./node_modules/ .bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add your app, which means we copy our app to paste on the image server
COPY . ./

# start our app
CMD ["npm", "start"]