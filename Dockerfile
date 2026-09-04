FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy assets first (2GB, rarely changes) — cached as its own layer
COPY assets/ ./assets/

# Copy source + config (5MB, changes often) — only this layer rebuilds
COPY src/ ./src/
COPY webpack_plugins/ ./webpack_plugins/
COPY webpack.config.js index.html jsconfig.json ./

# Patch webpack proxy to point to the server container
RUN sed -i "s|'http://localhost:6111'|'http://server:6111'|g" webpack.config.js && \
    sed -i "s|'http://localhost:6112'|'http://server:6112'|g" webpack.config.js && \
    sed -i "s|'http://localhost:80'|'http://server:80'|g" webpack.config.js && \
    sed -i "s|host: 'localhost'|host: '0.0.0.0'|g" webpack.config.js

EXPOSE 8080

CMD ["npx", "webpack", "serve", "--host", "0.0.0.0"]
