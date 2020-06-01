import { BadRequestDto, GenericErrorDto, NotFoundDto } from '@app/common-dtos';

describe('ErrorsDto', () => {
  it('GenericErrorDto', () => {
    const data = {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Generic Error',
      metadata: [],
    };
    const result = new GenericErrorDto(data);
    expect(result).toEqual(data);
  });

  it('NotFoundDto', () => {
    const data = {
      code: 'NOT_FOUND',
      message: 'Not Found Error',
      metadata: [],
    };
    const result = new NotFoundDto(data);
    expect(result).toEqual(data);
  });

  it('BadRequestDto', () => {
    const data = {
      code: 'VERIFY_PARAMETERS_ERROR',
      message: 'Bad Request',
      metadata: [
        'name must be a string',
      ],
    };
    const result = new BadRequestDto(data);
    expect(result).toEqual(data);
  });
});
