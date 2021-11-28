FROM node

# Create app directory
WORKDIR /usr/app/

# Install app dependencies
COPY package*.json ./
RUN yarn

# Bundle App Source
RUN yarn build
EXPOSE 4000