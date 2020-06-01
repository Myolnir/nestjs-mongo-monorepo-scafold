import {
  Body, Controller, Get, Param, Patch, Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse,
  ApiTags,
  ApiParam, ApiConflictResponse,
} from '@nestjs/swagger';
import { BadRequestDto, GenericErrorDto, NotFoundDto } from '@app/common-dtos';
import { logger } from '@app/logger';
import { CreateFizzDto } from './dtos/create-fizz.dto';
import { FizzResponseDto } from './dtos/fizz-response.dto';
import { UpdateFizzDto } from './dtos/update-fizz.dto';
import { FizzDto } from './dtos/fizzDto';
import { FizzDomainService } from './fizz-domain.service';

@Controller('/fizz')
@ApiTags('Fizz Api')
@ApiBearerAuth()
export class FizzController {
  constructor(
    private readonly fizzDomainService: FizzDomainService,
  ) {}

  @Post('/')
  @ApiCreatedResponse({ description: 'Create a fizz', type: FizzResponseDto })
  @ApiBadRequestResponse({ description: 'Bad Request', type: BadRequestDto })
  @ApiConflictResponse({ description: 'Creation Error' })
  @ApiInternalServerErrorResponse({ description: 'Generic error.', type: GenericErrorDto })
  async create(@Body() createFizz: CreateFizzDto): Promise<FizzResponseDto> {
    logger.info('Request to create new fizz');
    const result: FizzDto = await this.fizzDomainService.create(createFizz);
    return new FizzResponseDto(result);
  }

  /**
   * Gets fizz info by id.
   * @param fizzId fizz id
   */
  @Get(':fizzId')
  @ApiParam({ name: 'fizzId', example: 'usr.236be031-e9ca-4f86-ae33-e9af07ae1ac2', type: String })
  @ApiOkResponse({ description: 'Return a fizz', type: FizzResponseDto })
  @ApiNotFoundResponse({ description: 'fizz not found', type: NotFoundDto })
  @ApiInternalServerErrorResponse({ description: 'Generic error.', type: GenericErrorDto })
  async readOne(@Param('fizzId') fizzId: string): Promise<FizzResponseDto> {
    logger.info(`Request to getting existing fizz ${fizzId}`);
    const result: FizzDto = await this.fizzDomainService.findOne(fizzId);
    return new FizzResponseDto(result);
  }

  /**
   * Update an existing fizz in the system, if the fizz doesn't exists it return an error.
   * @param fizzId the unique id of the fizz.
   * @param updateFizz the data to be updated.
   */
  @Patch(':fizzId')
  @ApiParam({ name: 'fizzId', example: 'usr.236be031-e9ca-4f86-ae33-e9af07ae1ac2', type: String })
  @ApiOkResponse({ description: 'Return a fizz updated', type: FizzResponseDto })
  @ApiNotFoundResponse({ description: 'fizz not found', type: NotFoundDto })
  @ApiInternalServerErrorResponse({ description: 'Generic error.', type: GenericErrorDto })
  async updateOne(@Param('fizzId') fizzId: string, @Body() updateFizz: UpdateFizzDto): Promise<FizzResponseDto> {
    logger.info(`Request to update existing fizz ${fizzId}`);
    const result: FizzDto = await this.fizzDomainService.updateFizz(fizzId, updateFizz);
    return new FizzResponseDto(result);
  }
}
