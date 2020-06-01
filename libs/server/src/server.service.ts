import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { createNamespace } from 'cls-hooked';
import { NestApplication } from '@nestjs/core';
import * as swStats from 'swagger-stats';
import { uuid } from 'uuidv4';
import { RateLimit } from '@app/server/types/rate-limit.type';
import { ConfigOptions } from './types/config-options.type';
import { Register } from './types/register.type';


export abstract class Server {
  static app: NestApplication;

  static logger: any;

  static setup(app: NestApplication, configOptions: ConfigOptions): NestApplication {
    this.app = app;
    const {
      namespaceName, registers, features: { swagger, rateLimit: rateLimitConfig }, logger,
    } = configOptions;
    this.app.use(swStats.getMiddleware());

    this.logger = logger;

    if (swagger.enable) {
      const { serverInfo: { name, description, version } } = configOptions;
      const { endpoint } = swagger;
      this.setDocumentation(name, description, version, endpoint);
    }

    this.setExternalFeatures(rateLimitConfig);
    this.setRegisters(registers);
    this.handleRequestId(namespaceName);
    this.setEvents();
    return app;
  }

  private static setExternalFeatures(rateLimitConfig: RateLimit): void {
    this.app.enableCors();
    this.app.use(helmet());
    this.app.use(
      rateLimit(rateLimitConfig),
    );
  }

  private static handleRequestId(namespaceName) {
    const personalizedRequest = createNamespace(namespaceName);

    this.app.use((req, res, next) => {
      personalizedRequest.run(() => {
        if (req.headers['request-id']) {
          personalizedRequest.set('reqId', req.headers['request-id']);
        } else {
          const id: string = uuid();
          req.headers['request-id'] = id;
          personalizedRequest.set('reqId', id);
        }
        // TODO - Refactor this shit. Set runs async and req_id is not set.
        setTimeout(() => {
          next();
        }, 10);
      });
    });
  }

  private static handle(signal): void {
    if (this.logger) {
      this.logger.info(`Received ${signal}. Shutting down server`);
    }
    process.exit(0);
  }

  private static setRegisters(registers: Register[]): void {
    registers.forEach((option) => {
      const { method, elements } = option;
      elements.forEach((f) => {
        this.app[method](f());
      });
    });
  }

  private static setEvents(): void {
    process.on('SIGTERM', this.handle);
    process.on('SIGINT', this.handle);
    process.on('unhandledRejection', this.handle);
    process.on('uncaughtException', this.handle);
  }

  private static setDocumentation(name: string, description: string, version: string, endpoint: string): void {
    const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle(name)
      .setDescription(description)
      .setVersion(version)
      .build();
    const document = SwaggerModule.createDocument(this.app, options);
    SwaggerModule.setup(endpoint, this.app, document);
  }
}
