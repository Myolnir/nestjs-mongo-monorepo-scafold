import { logger } from '@app/logger';
import { ErrorException, Error } from '@app/exceptions';

/**
 * Checks if a property is in an array of forbidden properties and sends and error
 * @param propertyOne property to check
 * @param properties property array
 * @param err ErrorException to throw
 */
export const verifyPropertyIsNotSync = (
  propertyOne: string | number,
  properties: Array<string | number>,
  err: Error,
): void => {
  if (properties.includes(propertyOne)) {
    logger.error('Wrong verification', err);
    throw new ErrorException(err);
  }
};
