import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateFizzDto {
  @ApiProperty({ required: false, example: 'John', type: String })
  @IsOptional()
  readonly name?: string;
}
