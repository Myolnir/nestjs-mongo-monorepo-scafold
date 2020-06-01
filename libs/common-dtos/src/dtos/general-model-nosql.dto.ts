import { ApiProperty } from '@nestjs/swagger';

export class GeneralModelNosqlDto {
  @ApiProperty({ example: '1234567890', type: String })
  readonly id: number;

  @ApiProperty({ example: '2020-01-31 12:30:36.646139', type: Number })
  readonly createdAt: string;

  @ApiProperty({ example: '2020-01-31 12:30:36.646139', type: Number })
  readonly updatedAt: string;

  constructor(id, createdAt, updatedAt) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
