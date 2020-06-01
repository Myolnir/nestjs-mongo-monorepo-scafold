import { TestingModule, Test } from '@nestjs/testing';
import { ArgumentsHost, HttpException } from '@nestjs/common';
import { ErrorException } from '@app/exceptions';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

describe('AllExceptionsFilter', () => {
  let httpExceptionFilter: HttpExceptionFilter;

  const responseMock = {
    status: jest.fn().mockImplementation(() => ({ json: jest.fn() })),
    json: jest.fn(),
  };

  const switchToHttpMock = jest.fn().mockImplementation(() => ({
    getResponse: jest.fn().mockImplementation(() => responseMock),
  }));

  const hostMock: ArgumentsHost = {
    switchToHttp: jest.fn()
      .mockImplementation(switchToHttpMock),
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getType: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpExceptionFilter,
      ],
    }).compile();
    httpExceptionFilter = module.get<HttpExceptionFilter>(HttpExceptionFilter);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('response should be called with code 400', () => {
    const exception: HttpException = new HttpException('', 400);
    expect(httpExceptionFilter).toBeDefined();
    httpExceptionFilter.catch(exception, hostMock);
    expect(responseMock.status).toBeCalledWith(400);
  });

  it('response should be called with code 404', () => {
    const exception: HttpException = new HttpException('', 404);
    expect(httpExceptionFilter).toBeDefined();
    httpExceptionFilter.catch(exception, hostMock);
    expect(responseMock.status).toBeCalledWith(404);
  });

  it('response should be called with an exception', () => {
    const exception: ErrorException = new ErrorException({
      statusCode: 500,
      code: 'GENERAL_ERROR',
      message: 'Internal Server Error',
    });
    expect(httpExceptionFilter).toBeDefined();
    httpExceptionFilter.catch(exception, hostMock);
    expect(responseMock.status).toBeCalledWith(500);
  });
});
