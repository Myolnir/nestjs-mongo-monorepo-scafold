import {
  Min, IsOptional, IsInt, IsEnum, IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { CONFIG } from '../config';
import { SortTypes } from '../enums/sort.enum';

export class PaginationDto {
  @ApiProperty({ required: false, type: Number, example: 1 })
  @IsInt()
  @Min(1)
  @Transform((value) => Number(value))
  @IsOptional()
  readonly page?: number;

  @ApiProperty({ required: false, type: String, example: 10 })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Transform((value) => Number(value))
  readonly limit?: number;

  @ApiProperty({
    required: false, enum: SortTypes, type: String, example: SortTypes.CREATED_AT_ASC,
  })
  @IsString()
  @IsEnum(SortTypes)
  @IsOptional()
  readonly sort?: string;

  constructor(data: any) {
    this.page = (data && data.page) || CONFIG.DEFAULT_PAGE;
    this.limit = (data && data.limit) || CONFIG.DEFAULT_LIMIT;
    this.sort = (data && data.sort) || CONFIG.DEFAULT_SORT;
  }
}
