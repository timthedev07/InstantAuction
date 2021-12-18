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
COPY .env.prod ./dist/.env
WORKDIR /usr/app/dist


# Run App
EXPOSE 4000
ENV ON_DOCKER=true
CMD [ "node", "src/index.js" ]