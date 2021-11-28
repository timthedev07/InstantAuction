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
EXPOSE 4000
CMD [ "node", "dist/index.js" ]