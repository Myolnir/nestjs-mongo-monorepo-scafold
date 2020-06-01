import { PaginationDto } from '@app/common-dtos';

describe('PaginationDto', () => {
  it('PaginationDto with sort param', () => {
    const data = {
      page: 1,
      limit: 10,
      sort: 'createdAt',
    };

    const response = new PaginationDto(data);
    expect(response).toEqual(data);
  });

  it('PaginationDto without params', () => {
    const data = {
      page: 0,
      limit: 10,
      sort: 'createdAt',
    };

    const response = new PaginationDto({});
    expect(response).toEqual({ ...data });
  });
});
