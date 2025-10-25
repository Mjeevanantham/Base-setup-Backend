import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  APP_NAME: Joi.string().default('Base API'),
  HOST: Joi.string().default('0.0.0.0'),
  PORT: Joi.number().port().default(3000),
  GLOBAL_PREFIX: Joi.string().default('api'),

  LOG_LEVEL: Joi.string()
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent')
    .default('debug'),
  LOG_PRETTY: Joi.boolean().default(true),

  CORS_ENABLED: Joi.boolean().default(true),
  CORS_ORIGIN: Joi.string().default('*'),

  SWAGGER_ENABLED: Joi.boolean().default(true),
  SWAGGER_PATH: Joi.string().default('docs'),
  SWAGGER_TITLE: Joi.string().default('Base API'),
  SWAGGER_DESCRIPTION: Joi.string().default('REST API'),
  SWAGGER_VERSION: Joi.string().default('1.0.0'),

  RATE_LIMIT_TTL: Joi.number().default(60),
  RATE_LIMIT_LIMIT: Joi.number().default(60),
});
