import { logger } from '@app/logger';
import { ErrorException, Error } from '@app/exceptions';

export const verifyPropertySync = (
  propertyOne: string | number | boolean,
  propertyTwo: string | number | boolean,
  err: Error,
): void => {
  if (propertyOne !== propertyTwo) {
    logger.error('Wrong verification', err);
    throw new ErrorException(err);
  }
};
