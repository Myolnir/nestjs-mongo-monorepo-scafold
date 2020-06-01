import { Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '@app/common-dtos';

export abstract class SingleEntityDbService<Entity, ModelDto, CreateDto, UpdateDto, FiltersDto> {
  protected constructor(
    private resourceType: string,
    private readonly repository: Repository<any>,
    private readonly logger,
  ) {}

  // Main methods //
  async create(createModel: CreateDto): Promise<ModelDto> {
    this.logger.info(`Creating ${this.resourceType}`);
    await this.validateBeforeCreate(createModel);
    const model: Entity = await this.setCreateData(createModel);
    const result = await this.repository.save(model);
    return this.toDto(result);
  }

  // eslint-disable-next-line max-len
  async findAll(filters: FiltersDto, pagination?: PaginationDto): Promise<{ data: ModelDto[], count: number }> {
    this.logger.info(`Finding all ${this.resourceType}`);
    let query: SelectQueryBuilder<Entity> = this.repository.createQueryBuilder(this.resourceType);
    query = this.setQuery(query, filters);
    if (!pagination || Object.keys(pagination).length) {
      query = this.setPagination(query, this.resourceType, pagination);
    }
    const result = await query.getManyAndCount();
    const data: ModelDto[] = result[0].map((row: Entity): ModelDto => this.toDto(row));
    const count: number = result[1];
    return { data, count };
  }

  async findOneById(id: number): Promise<ModelDto> {
    this.logger.info(`Getting ${this.resourceType} by id: ${id}`);
    const result: Entity = await this.repository.findOne(id);
    this.validateResult(id, result);
    return this.toDto(result);
  }

  async findOneByQuery(criteria: object): Promise<ModelDto> {
    this.logger.info(`Getting ${this.resourceType} by criteria`, { criteria });
    const result: Entity = await this.repository.findOne(criteria);
    this.validateResult(null, result);
    return this.toDto(result);
  }

  async update(id: number, updateModel: UpdateDto): Promise<ModelDto> {
    this.logger.info(`Updating ${this.resourceType} with id: ${id}`);
    await this.validateBeforeUpdate(updateModel);
    let result: Entity = await this.repository.findOne(id);
    this.validateResult(id, result);
    const updatedResult: Entity = this.setUpdateData(result, updateModel);
    result = await this.repository.save(updatedResult);
    return this.toDto(result);
  }

  async delete(id: number, force = false): Promise<void> {
    this.logger.info(`Deleting ${this.resourceType} with id: ${id}. SoftDelete: ${!force}`);
    if (force) {
      await this.repository.delete(id);
    } else {
      const result: Entity = await this.repository.findOne(id);
      if (result) {
        await this.repository.save({ ...result, deletedAt: new Date() });
      }
    }
  }

  // Set data methods //
  abstract toDto(data: Entity): ModelDto;

  abstract setCreateData(create: CreateDto): Entity;

  abstract setUpdateData(model: Entity, update: UpdateDto): Entity;

  private setPagination(
    query: SelectQueryBuilder<Entity>, resourceType: string, paginationDto: PaginationDto,
  ): SelectQueryBuilder<Entity> {
    const { page, limit, sort } = paginationDto;
    query.take(limit);
    query.skip(limit * (page - 1));
    const direction: 'ASC' | 'DESC' = /^-/.test(sort) ? 'DESC' : 'ASC';
    const property: string = direction === 'DESC' ? sort.replace('-', '') : sort;
    query.addOrderBy(`${resourceType}.${property}`, direction);
    return query;
  }

  // eslint-disable-next-line max-len
  private setQuery(query: SelectQueryBuilder<Entity>, filters: FiltersDto): SelectQueryBuilder<Entity> {
    query.where({ ...filters, deletedAt: null });
    return query;
  }

  // Validate data methods
  async validateBeforeCreate(createModel: CreateDto): Promise<any> {
    return Promise.resolve(createModel);
  }

  async validateBeforeUpdate(updateModel: UpdateDto): Promise<any> {
    return Promise.resolve(updateModel);
  }

  abstract validateResult(id: number, result: Entity): void;
}
