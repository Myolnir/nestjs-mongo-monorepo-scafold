import { ApiProperty } from '@nestjs/swagger';
import { FizzDto } from './fizzDto';

export class FizzResponseDto {
  @ApiProperty({ required: true, type: FizzDto, example: FizzDto })
  readonly data: FizzDto;

  constructor(data: FizzDto) {
    this.data = data;
  }
}
