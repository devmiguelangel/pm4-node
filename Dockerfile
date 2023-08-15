FROM node:18.17.1

RUN apt-get update

RUN npm i -g @nestjs/cli

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Command to start the application in development mode
# CMD ["npm", "run", "start:dev"]
