FROM node

# Create app directory
WORKDIR /usr/app/

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

# Bundle App Source
RUN yarn build

# Run App
EXPOSE 4000
ENV ON_DOCKER=true
CMD [ "node", "dist/src/index.js" ]