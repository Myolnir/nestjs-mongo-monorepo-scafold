import { HttpException } from '@nestjs/common';
import { Error } from '../types/error.type';

export class ErrorException extends HttpException {
  constructor(errorInfo: Error, metadata?: any[]) {
    const { statusCode, ...infoTest } = errorInfo;
    super({ ...infoTest, metadata }, statusCode);
  }
}
