import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { logger } from '@app/logger/logger.service';
import { ErrorException } from '@app/exceptions';
import { toDotNotation } from '@app/utils';
import { appErrors } from '../../app.errors';
import { FizzDto } from './dtos/fizzDto';
import { IFizz } from '../database/schemas/interfaces/fizz.interface';
import { InternalCreateFizzDto } from './dtos/internals/create-fizz.dto';
import { InternalUpdateUserDto } from './dtos/internals/update-user.dto';

@Injectable()
export class FizzDatabaseService {
  constructor(
    @Inject('FIZZ_MODEL') private fizzModel: Model<IFizz>,
  ) {}

  /**
   * @description create new user
   * @param createDto
   * @return FizzDto
   */
  async create(createDto: InternalCreateFizzDto): Promise<FizzDto> {
    logger.info('Creating new user', { createDto });
    try {
      const fizz: any = await this.fizzModel.create({ ...createDto });
      return new FizzDto(fizz);
    } catch (err) {
      logger.info('Error creating new fizz', err);
      throw new ErrorException(appErrors.FIZZ.CREATION_ERROR);
    }
  }

  /**
   * @description Update one fizz by Id
   * @param id
   * @param data
   * @param deleted
   * @return FizzDto
   */
  async updateOneById(id: string, data: InternalUpdateUserDto, deleted: boolean = false): Promise<FizzDto> {
    logger.info(`Updating fizz by id ${id}`);
    let fizz;
    try {
      fizz = await this.fizzModel.findOneAndUpdate(
        this.handleDeletedAtInQuery({ id }, deleted),
        toDotNotation(data),
        { new: true },
      );
    } catch (err) {
      logger.info(`Error updating fizz with id: ${id}`, err);
      throw new ErrorException(appErrors.FIZZ.UPDATING_ERROR);
    }
    if (!fizz) {
      return null;
    }
    return new FizzDto(fizz);
  }

  /**
   * @description Update one user by filters
   * @param filters
   * @param data
   * @param deleted
   * @return FizzDto
   */
  async updateOneByFilters(filters: object, data: InternalUpdateUserDto, deleted: boolean = false): Promise<FizzDto> {
    logger.info('Updating user by filters', filters);
    let user;
    try {
      user = await this.fizzModel.findOneAndUpdate(
        this.handleDeletedAtInQuery(filters, deleted),
        toDotNotation(data),
        { new: true },
      );
    } catch (err) {
      logger.info(`Error updating user with filters: ${filters}`, err);
      throw new ErrorException(appErrors.FIZZ.UPDATING_ERROR);
    }
    if (!user) {
      return null;
    }
    return new FizzDto(user);
  }

  /**
   * @description Find one user by Id
   * @param id
   * @param deleted
   * @return FizzDto
   */
  async findById(id: string, deleted: boolean = false): Promise<FizzDto> {
    logger.info(`Getting fizz by id ${id}`);
    const fizz = await this.fizzModel.findOne(this.handleDeletedAtInQuery({ id }, deleted));
    if (!fizz) {
      return null;
    }
    return new FizzDto(fizz);
  }

  /**
   * Handles deletedAt option in query
   * @param filters query
   * @param deleted boolean to search deleted resources or not
   */
  private handleDeletedAtInQuery(filters: object, deleted: boolean): object {
    const findDeleted = deleted ? {} : { deletedAt: null };
    return { ...filters, ...findDeleted };
  }
}
