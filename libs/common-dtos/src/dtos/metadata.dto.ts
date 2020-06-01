import { ApiProperty } from '@nestjs/swagger';

export class MetadataDto {
  @ApiProperty({
    description: 'Num total pages',
    type: Number,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Num total items',
    type: Number,
  })
  totalItems: number;

  @ApiProperty({
    description: 'Size of page',
    type: Number,
  })
  size: number;

  @ApiProperty({
    description: 'Number of page',
    type: Number,
  })
  page: number;

  constructor(totalPages: number, totalItems: number, size: number, page: number) {
    this.totalItems = totalItems;
    this.totalPages = totalPages;
    this.size = size;
    this.page = page;
  }
}
