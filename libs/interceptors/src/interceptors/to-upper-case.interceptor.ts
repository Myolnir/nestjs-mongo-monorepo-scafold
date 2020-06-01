import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { isPlainObject } from 'lodash';

interface Response<T> {
  data: T;
}

@Injectable()
export class ToUpperCaseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly config: any;

  constructor(config: any) {
    this.config = config;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;
    request.body = this.objectToUppercase(body);
    return next.handle();
  }

  private objectToUppercase(body: object) {
    const obj = { ...body };
    Object.keys(obj || {}).forEach((newKey) => {
      const newVal = obj[newKey];
      if (isPlainObject(newVal)) {
        obj[newKey] = this.objectToUppercase(newVal);
      } else {
        obj[newKey] = this.toUppercase(newVal, newKey);
      }
    });
    return obj;
  }

  private toUppercase(val: any, key: any) {
    if (typeof val === 'string' && (!this.config
        || !this.config.exceptions || !this.config.exceptions.length
        || !this.config.exceptions.some((c) => c === key))) {
      return val.toUpperCase();
    }
    return val;
  }
}
