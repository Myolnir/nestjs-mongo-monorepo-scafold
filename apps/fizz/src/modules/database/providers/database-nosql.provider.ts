import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { logger } from '@app/logger';
import { Connection } from 'mongoose';
import { FizzSchema } from '../schemas/fizz.schema';

export const databaseNosqlProvider = [
  {
    provide: 'DB_NOSQL_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<any> => {
      const dbConfig = configService.get('database.mongo');
      const {
        options,
      } = dbConfig;
      const uri: string = `mongodb://${dbConfig.uri}:${dbConfig.port}`;
      const connection = await mongoose.connect(uri, options)
        .catch((err) => {
          logger.error('Error connecting with Mongo db', err);
          if (process.env.NODE_ENV === 'production') { throw err; }
        });
      logger.debug('MongoDB Database connected');
      return connection;
    },
  },
  {
    provide: 'FIZZ_MODEL',
    useFactory: (connection: Connection) => connection.model('Fizz', FizzSchema),
    inject: ['DB_NOSQL_CONNECTION'],
  },
];
