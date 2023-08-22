# Processmaker real-time server

## Description

Real-time server application for live collaborative editing design tool built with Nest framework TypeScript.

## System Requirements
- Node.js 18.17.1
- Websocket
- Redis
- Docker

## Redis authentication

```bash
# envs/redis.env

REDIS_ARGS=--requirepass secret
```

## Redis connection

```bash
# envs/app.env

BROADCAST_DRIVER=redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=secret
```

Replace `secret` with your own password

## Install dependencies

```bash
$ npm install
```

## Build the Docker images
```bash
docker compose build
```

## Run the Docker containers
```bash
docker compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This project is licensed under the [MIT licensed](LICENSE).
