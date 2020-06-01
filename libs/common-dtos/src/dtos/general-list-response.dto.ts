import { ApiProperty } from '@nestjs/swagger';
import { MetadataDto } from './metadata.dto';

export class GeneralListResponseDto {
  @ApiProperty({ isArray: true, example: [] })
  readonly data: [];

  @ApiProperty()
  readonly metadata: MetadataDto;

  constructor(data, totalItems: number, pageSize: number, page: number) {
    this.data = data.map((ref) => {
      const refCloned = { ...ref };
      delete refCloned.deletedAt;
      return refCloned;
    });
    this.metadata = new MetadataDto(Math.ceil(totalItems / pageSize), totalItems, pageSize, page);
  }
}
