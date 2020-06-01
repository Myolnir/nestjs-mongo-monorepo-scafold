import { NestApplication, NestFactory } from '@nestjs/core';
import { Server } from '@app/server';
import { logger } from '@app/logger';
import { AppModule } from './app.module';
import configuration from './app.config';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  const { server } = configuration();

  Server.setup(app, server);

  const { port } = server;
  logger.info(`Server running at ${port}`, { config: { rateLimit: server.features.rateLimit } });
  await app.listen(port);
}

bootstrap();
