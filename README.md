# Base NestJS Backend Starter

A production-ready NestJS base project with industry-standard structure, secure bootstrap, typed configuration, validation, health checks, logging, Swagger docs, linting/formatting, and Docker setup.

## Features
- Typed configuration with validation (`@nestjs/config`, `joi`)
- Centralized bootstrap: global prefix, API versioning, CORS, Helmet, compression, cookies
- Global validation pipe (whitelist + transform)
- Structured logging with `nestjs-pino` (pretty in dev)
- Rate limiting via `@nestjs/throttler`
- Health checks with `@nestjs/terminus` at `/health`
- OpenAPI (Swagger) docs (configurable path)
- ESLint + Prettier configured
- Dockerfile and docker-compose for local/prod

## Project Structure
```
src/
  common/
    filters/
    interceptors/
  config/
    configuration.ts
    validation.ts
  modules/
    health/
      health.controller.ts
      health.module.ts
  app.controller.ts
  app.module.ts
  app.service.ts
  main.ts
```

## Getting Started
1. Copy env and install dependencies:
```bash
cp .env.example .env
pnpm install
```
2. Run locally (watch):
```bash
pnpm run start:dev
```
3. Build and run prod:
```bash
pnpm run build
pnpm run start:prod
```

## Environment
Edit `.env` (all values validated):
- APP_NAME, NODE_ENV, HOST, PORT, GLOBAL_PREFIX
- LOG_LEVEL, LOG_PRETTY
- CORS_ENABLED, CORS_ORIGIN
- SWAGGER_ENABLED, SWAGGER_PATH, SWAGGER_TITLE, SWAGGER_DESCRIPTION, SWAGGER_VERSION
- RATE_LIMIT_TTL, RATE_LIMIT_LIMIT

## API
- Hello: `GET /api/v1`
- Health: `GET /health`
- Docs: `GET /docs` (if enabled)

## Scripts
- build: clean and compile
- start: run compiled app
- start:dev: dev server with watch
- start:prod: production mode
- lint: lint and fix
- test, test:watch, test:cov, test:e2e

## Docker
Build and run:
```bash
docker build -t base-api .
docker run -p 3000:3000 --env-file .env base-api
```
Or via compose:
```bash
docker-compose up --build
```

## Conventions
- Use `v{n}` URI versioning; add `@Version('2')` for new endpoints
- Keep modules self-contained under `src/modules/<name>`
- Configuration under `src/config` only; do not read `process.env` elsewhere
- Global concerns (filters, interceptors) under `src/common`

## License
UNLICENSED (customize as needed)
