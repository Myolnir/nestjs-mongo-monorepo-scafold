import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import configuration from './app.config';
import { AppController } from './app.controller';
import { FizzModule } from './modules/fizz/fizz.module';

@Module({
  controllers: [
    AppController,
  ],
  imports: [
    MulterModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    FizzModule,
  ],
})

export class AppModule {}
