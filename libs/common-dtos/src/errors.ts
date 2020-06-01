export const ERRORS = Object.freeze(
  {
    VERIFY_PARAMETERS: {
      statusCode: 400,
      code: 'VERIFY_PARAMETERS_ERROR',
      message: 'Bad Request',
      metadata: [
        'name must be a string',
        'name must be shorter than or equal to 21 characters',
      ],
    },
    NOT_FOUND: {
      statusCode: 404,
      code: 'NOT_FOUND',
      message: 'Not Found Error',
      metadata: [],
    },
    INTERNAL_SERVER_ERROR: {
      statusCode: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Generic error',
      metadata: [],
    },
  },
);
