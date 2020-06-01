import { GeneralModelDto } from '@app/common-dtos';

describe('GeneralModelDto', () => {
  it('should return correct response', () => {
    const data = {
      id: 1,
      createdAt: '2020-01-31 12:30:36.646139',
      updatedAt: '2020-01-31 12:30:36.646139',
    };

    const response = new GeneralModelDto(data.id, data.createdAt, data.updatedAt);
    expect(response).toEqual(data);
  });
});
