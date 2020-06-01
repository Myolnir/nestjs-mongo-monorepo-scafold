import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
} from 'class-validator';

export class CreateFizzDto {
  @ApiProperty({ example: 'John', type: String })
  @IsString()
  readonly name: string;
}
