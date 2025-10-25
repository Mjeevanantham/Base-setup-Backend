import { config } from 'dotenv';

config();

function parseBoolean(value: string | undefined, defaultValue: boolean) {
  if (value === undefined) return defaultValue;
  return /^(true|1|yes)$/i.test(value);
}

function parseCsv(value: string | undefined): string[] | '*' {
  if (!value || value.trim() === '' || value.trim() === '*') return '*';
  return value.split(',').map((v) => v.trim()).filter((v) => v.length > 0);
}

export default () => {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const isProduction = nodeEnv === 'production';

  return {
    app: {
      name: process.env.APP_NAME ?? 'Base API',
      env: nodeEnv,
      host: process.env.HOST ?? '0.0.0.0',
      port: Number(process.env.PORT ?? 3000),
      globalPrefix: process.env.GLOBAL_PREFIX ?? 'api',
    },
    cors: {
      enabled: parseBoolean(process.env.CORS_ENABLED, true),
      origin: parseCsv(process.env.CORS_ORIGIN),
    },
    swagger: {
      enabled: parseBoolean(process.env.SWAGGER_ENABLED, nodeEnv !== 'production'),
      path: process.env.SWAGGER_PATH ?? 'docs',
      title: process.env.SWAGGER_TITLE ?? 'Base API',
      description: process.env.SWAGGER_DESCRIPTION ?? 'REST API',
      version: process.env.SWAGGER_VERSION ?? '1.0.0',
    },
    rateLimit: {
      ttl: Number(process.env.RATE_LIMIT_TTL ?? 60),
      limit: Number(process.env.RATE_LIMIT_LIMIT ?? 60),
    },
    log: {
      level: process.env.LOG_LEVEL ?? (isProduction ? 'info' : 'debug'),
      pretty: parseBoolean(process.env.LOG_PRETTY, !isProduction),
    },
  } as const;
};
