import { ApiProperty } from '@nestjs/swagger';

export class FizzDto {
  @ApiProperty({ example: 'usr.248d6f55-21d8-41a3-8dc1-44938ac1aa29', type: String })
  readonly id: string;

  @ApiProperty({ required: true, example: 'John', type: String })
  readonly name: string;

  @ApiProperty({ example: '2020-01-31 12:30:36.646139', type: String })
  readonly createdAt: string;

  @ApiProperty({ example: '2020-01-31 12:30:36.646139', type: String })
  readonly updatedAt: string;

  constructor(data: any) {
    this.id = data.id || undefined;
    this.name = data.name || undefined;
    this.createdAt = data.createdAt || undefined;
    this.updatedAt = data.updatedAt || undefined;
  }
}
