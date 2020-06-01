export const appErrors = Object.freeze(
  {
    INTERNAL_SERVER_ERROR: {
      statusCode: 500,
      code: 'USERS_INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    },
    VERIFY_PARAMETERS_ERROR: {
      statusCode: 400,
      code: 'VERIFY_PARAMETERS_ERROR',
      message: 'Bad Request',
    },
    GENERIC_ERROR: {
      statusCode: 500,
      code: 'GENERAL_ERROR',
      message: 'Internal Server Error',
    },
    FIZZ: {
      NOT_FOUND: {
        statusCode: 404,
        code: 'FIZZ_NOT_FOUND',
        message: 'Fizz does not exist',
      },
      CREATION_ERROR: {
        statusCode: 409,
        code: 'FIZZ_CREATION_ERROR',
        message: 'An error occurred while attempting to create the fizz',
      },
      UPDATING_ERROR: {
        statusCode: 409,
        code: 'FIZZ_UPDATING_ERROR',
        message: 'An error occurred while attempting to update the fizz',
      },
    },
  },
);
