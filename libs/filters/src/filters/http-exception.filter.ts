import {
  ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus,
} from '@nestjs/common';
import { logger } from '@app/logger';
import { ErrorException } from '@app/exceptions';
import { convertToArray } from '@app/utils';
import { isPlainObject, isArray } from 'lodash';
import { ERRORS } from '../errors';


const getError = (exception): string => ((isPlainObject(exception) && exception.error) || '');
const getMessage = (exception): string => {
  const message = (isPlainObject(exception) && exception.message);
  return message && isArray(message) ? message[0] : message;
};
const getArrayMessage = (exception): any[] => {
  const message = (isPlainObject(exception) && exception.message);
  return message && isArray(message) ? message : convertToArray(message);
};
const getMedatada = (exception): any[] => ((isPlainObject(exception) && convertToArray(exception.metadata)) || []);
const getCode = (exception): string => ((isPlainObject(exception) && exception.code) || '');

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    logger.error('HttpExceptionFilter catch error', { err: exception });

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Get general error status
    const status = (exception instanceof HttpException || exception instanceof ErrorException)
      ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // Get general error response
    const exceptionResponse = (exception instanceof HttpException || exception instanceof ErrorException) && exception.getResponse();

    // Initialized response for ErrorException instances
    let code: string = getCode(exceptionResponse);
    let message: string = getMessage(exceptionResponse) || '';
    let metadata: any[] = getMedatada(exceptionResponse);

    // Change response for non-ErrorException instances
    if (!(exception instanceof ErrorException) && status >= 400 && status < 500) {
      const exceptionError: string = getError(exceptionResponse);
      const exceptionMessage: any[] = getArrayMessage(exceptionResponse);
      code = exceptionError === 'Bad Request' ? ERRORS.VERIFY_PARAMETERS.code : ERRORS.BAD_REQUEST.code;
      message = exceptionError;
      metadata = exceptionMessage;
    }

    // Change response for TypeError instances
    if (exception instanceof TypeError) {
      code = ERRORS.INTERNAL_SERVER_ERROR.code;
      message = ERRORS.INTERNAL_SERVER_ERROR.message;
      metadata = exception.message ? convertToArray(exception.message) : [];
    }

    // Other errors
    if (!(exception instanceof TypeError)
    && !(exception instanceof ErrorException)
    && !exceptionResponse
    && exception instanceof Error) {
      code = ERRORS.INTERNAL_SERVER_ERROR.code;
      message = exception.name || ERRORS.INTERNAL_SERVER_ERROR.message;
      metadata = exception.message ? convertToArray(exception.message) : [];
    }

    response
      .status(status)
      .json({
        code,
        message,
        metadata,
      });
  }
}
