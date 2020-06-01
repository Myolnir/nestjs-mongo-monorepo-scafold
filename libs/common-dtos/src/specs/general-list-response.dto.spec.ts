import { GeneralListResponseDto, MetadataDto } from '@app/common-dtos';

describe('GeneralListResponseDto', () => {
  it('should return correct response', () => {
    const totalItems = 100;
    const pageSize = 10;
    const page = 1;
    const data = [
      { id: 1 },
      { id: 2 },
    ];
    const result = new GeneralListResponseDto(data, totalItems, pageSize, page);
    expect(result).toEqual({
      data,
      metadata: new MetadataDto(10, 100, pageSize, page),
    });
  });
});
