import { ErrorException } from './error.exception';

const error = {
  NOT_FOUND: {
    statusCode: 404,
    code: 'SERVICE_RESOURCE_NOT_FOUND',
    message: 'Resource does not exit',
  },
};

describe('ErrorException', () => {
  it('', () => {
    try {
      throw new ErrorException(error.NOT_FOUND);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.status).toEqual(404);
      expect(err).toEqual(new Error('Resource does not exit'));
    }
  });
});
