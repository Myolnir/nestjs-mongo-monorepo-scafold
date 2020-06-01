import { ValidationPipe } from '@nestjs/common';
import { ToUpperCaseInterceptor } from '@app/interceptors';
import { logger } from '@app/logger';
import { HttpExceptionFilter } from '@app/filters';
import { loadEnvConfig } from './common/utils/load-env-config.util';

// For tests it is important to change the name of the service in app.constants
const service: string = (process.env.SERVICE).toLowerCase();
const environment: string = process.env.NODE_ENV.toLowerCase();
loadEnvConfig(service, environment);

// /////////////////// BASE CONFIG /////////////////////////
const base = {
  name: 'Fizz Module',
  service,
  version: '1.0.0',
  description: 'Module to manage fizz for API',
  countryCode: 'ES',
  environment,
};
// /////////////////////////////////////////////////////////


// /////////////////// DATABASE CONFIG /////////////////////
const database = {
  mongo: {
    uri: process.env.DATABASE_MONGO_HOST,
    port: process.env.DATABASE_MONGO_PORT,
    db: process.env.DATABASE_MONGO,
    options: {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    },
  },
};

// /////////////////////////////////////////////////////////


// /////////////////////////////////////////////////////////
const cache = {
  host: process.env.CACHE_HOST,
  port: parseInt(process.env.CACHE_PORT, 10),
  database: parseInt(process.env.CACHE_DATABASE, 10),
  password: process.env.CACHE_PASSWORD,
  keyPrefix: process.env.CACHE_KEY_PREFIX,
};
// /////////////////////////////////////////////////////////


// /////////////////// SERVER CONFIG ///////////////////////
const server = {
  port: parseInt(process.env.SERVICE_PORT, 10),
  serverInfo: { ...base },
  namespaceName: 'personalizedRequest',
  logger,
  features: {
    swagger: {
      enable: process.env.NODE_ENV !== 'production',
      endpoint: '/doc',
    },
    rateLimit: {
      enable: true,
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_IN_MS, 10),
      max: parseInt(process.env.RATE_LIMIT_REQUEST, 10),
    },
  },
  registers: [
    {
      method: 'useGlobalPipes',
      elements: [
        () => new ValidationPipe({
          whitelist: true,
        }),
      ],
    },
    {
      method: 'useGlobalFilters',
      elements: [
        () => new HttpExceptionFilter(),
      ],
    },
    {
      method: 'useGlobalInterceptors',
      elements: [
        () => new ToUpperCaseInterceptor({ exceptions: ['refreshToken'] }),
      ],
    },
  ],
};
// /////////////////////////////////////////////////////////
// DEFAULT EXPORT
export default () => (Object.freeze({
  ...base,
  database,
  cache,
  server,
}));
