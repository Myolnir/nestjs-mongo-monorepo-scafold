import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseNosqlProvider } from './providers/database-nosql.provider';
@Module({
  providers: [
    ...databaseNosqlProvider,
  ],
  exports: [
    ...databaseNosqlProvider,
  ],
  imports: [
    ConfigModule,
  ],
})
export class DatabaseModule {}
