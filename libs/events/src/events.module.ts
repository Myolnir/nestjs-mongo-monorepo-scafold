import { Module } from '@nestjs/common';
import { eventProviders } from './events.provider';

@Module({
  providers: [...eventProviders],
  exports: [...eventProviders],
})
export class EventsModule {}
