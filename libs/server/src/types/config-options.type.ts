import { RateLimit } from '@app/server/types/rate-limit.type';
import { ServerInfo } from './server-info.type';
import { SwaggerFeature } from './swagger-feature.type';
import { Register } from './register.type';

export type ConfigOptions = {
  port: number;
  serverInfo: ServerInfo;
  namespaceName: string;
  logger: any;
  registers: Register[];
  features: {
    swagger: SwaggerFeature;
    rateLimit?: RateLimit
  },
};
