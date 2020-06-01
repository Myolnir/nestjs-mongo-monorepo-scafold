
// eslint-disable-next-line max-classes-per-file
import { ApiProperty } from '@nestjs/swagger';
import { ERRORS } from '../errors';

export class BadRequestDto {
  @ApiProperty({ type: Number, example: ERRORS.VERIFY_PARAMETERS.code })
  code: string;

  @ApiProperty({ type: String, example: ERRORS.VERIFY_PARAMETERS.message })
  message: string;

  @ApiProperty({ type: Array, example: ERRORS.VERIFY_PARAMETERS.metadata })
  metadata: Array<string> | [];

  constructor(data: any) {
    this.code = data.code;
    this.message = data.message;
    this.metadata = data.metadata;
  }
}
export class NotFoundDto {
  @ApiProperty({ type: Number, example: ERRORS.NOT_FOUND.code })
  code: string;

  @ApiProperty({ type: String, example: ERRORS.NOT_FOUND.message })
  message: string;

  @ApiProperty({ type: Array, example: ERRORS.NOT_FOUND.metadata })
  metadata: any[];

  constructor(data: any) {
    this.code = data.code;
    this.message = data.message;
    this.metadata = data.metadata;
  }
}
export class GenericErrorDto {
  @ApiProperty({ type: String, example: ERRORS.INTERNAL_SERVER_ERROR.code })
  code: string;

  @ApiProperty({ type: String, example: ERRORS.INTERNAL_SERVER_ERROR.message })
  message: string;

  @ApiProperty({ type: Array, example: ERRORS.INTERNAL_SERVER_ERROR.metadata })
  metadata: any[];

  constructor(data: any) {
    this.code = data.code;
    this.message = data.message;
    this.metadata = data.metadata;
  }
}

