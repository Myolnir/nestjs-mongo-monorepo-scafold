import { CallHandler, ExecutionContext } from '@nestjs/common';
import { ToUpperCaseInterceptor } from '../interceptors/to-upper-case.interceptor';

describe('ToUpperCaseInterceptor', () => {
  const requestMock = {
    body: {
      alias: 'pepe',
      profile: {
        name: 'pepe',
        surname: 'gonzalez',
      },
    },
  };

  const switchToHttpMock = jest.fn().mockImplementation(() => ({
    getRequest: jest.fn()
      .mockImplementationOnce(() => requestMock),
  }));

  const executionContextMock: ExecutionContext = {
    switchToHttp: jest.fn().mockImplementation(switchToHttpMock),
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getType: jest.fn(),
    getClass: jest.fn(),
    getHandler: jest.fn(),
  };

  const handleMock: CallHandler = {
    handle: jest.fn(),
  };

  it('should return properties parsed correctly', () => {
    const interceptor = new ToUpperCaseInterceptor({ exceptions: ['name'] });
    interceptor.intercept(executionContextMock, handleMock);
    expect(requestMock).toEqual({
      body: {
        alias: 'PEPE',
        profile: { name: 'pepe', surname: 'GONZALEZ' },
      },
    });
  });
});
