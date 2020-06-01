import {
  Module,
} from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FizzController } from './fizzController';
import { FizzDatabaseService } from './fizz-database.service';
import { FizzDomainService } from './fizz-domain.service';

@Module({
  controllers: [
    FizzController,
  ],
  providers: [
    FizzDomainService,
    FizzDatabaseService,
  ],
  imports: [
    DatabaseModule,
  ],
  exports: [
    FizzDatabaseService,
  ],
})

export class FizzModule{}
