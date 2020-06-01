import { EventEmitter } from 'events';

export const eventProviders = [
  {
    provide: 'EVENT_TOKEN',
    useFactory: async () => new EventEmitter(),
  },
];
