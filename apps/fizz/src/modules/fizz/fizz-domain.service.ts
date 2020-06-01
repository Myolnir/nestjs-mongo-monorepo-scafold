import { Injectable } from '@nestjs/common';
import { logger } from '@app/logger';
import { ConfigService } from '@nestjs/config';
import { ErrorException } from '@app/exceptions';
import { CreateFizzDto } from './dtos/create-fizz.dto';
import { FizzDto } from './dtos/fizzDto';
import { FizzDatabaseService } from './fizz-database.service';
import { UpdateFizzDto } from './dtos/update-fizz.dto';
import { appErrors } from '../../app.errors';

@Injectable()
export class FizzDomainService {
  constructor(
    private readonly fizzDatabaseService: FizzDatabaseService,
  ) {}

  /**
   * @description Creates a new fizz.
   * @param createDto
   * @errors no errors
   * @return FizzDto
   */
  async create(createDto: CreateFizzDto): Promise<FizzDto> {
    logger.info('Applying logic to register new fizz');
    const { name } = createDto;
    const fizz: FizzDto = await this.fizzDatabaseService
      .create({ name });
    return fizz;
  }

  /**
   * @description Update an existing fizz by its unique id.
   * @param fizzId
   * @param updateDto
   * @return FizzDto
   */
  async updateFizz(fizzId: string, updateDto: UpdateFizzDto): Promise<FizzDto> {
    logger.info(`Applying logic to update existing fizz ${fizzId}`);
    const fizz: FizzDto = await this.fizzDatabaseService.updateOneById(fizzId, updateDto);
    this.checkUserAndThrowError(fizz, fizzId);
    return fizz;
  }

  /**
   * Gets one fizz by id
   * @param fizzId user id
   * @return FizzDto
   */
  async findOne(fizzId: string): Promise<FizzDto> {
    logger.info(`Applying logic to getting existing fizz ${fizzId}`);
    const user: FizzDto = await this.fizzDatabaseService.findById(fizzId);
    this.checkUserAndThrowError(user, fizzId);
    return user;
  }

  /**
   * Checks if user exists and throw error if not
   * @param user user
   * @param userId user id
   */
  private checkUserAndThrowError(user: FizzDto, userId: string) {
    if (!user) {
      logger.error(`User with id: ${userId} does not exist`);
      throw new ErrorException(appErrors.FIZZ.NOT_FOUND);
    }
  }
}
