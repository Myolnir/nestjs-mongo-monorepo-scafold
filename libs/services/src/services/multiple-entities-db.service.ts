import { Connection, EntityManager } from 'typeorm';
import { PaginationDto } from '@app/common-dtos';

export abstract class MultipleEntitiesDbService<ModelDto, CreateDto, UpdateDto, FiltersDto> {
  protected constructor(
    private resourceType: string,
    protected connection: Connection,
    private parentEntity: string,
    private relations: string[],
    private logger,
  ) {
  }

  // Main methods //
  async create(createDto: CreateDto): Promise<ModelDto> {
    this.logger.info(`Creating ${this.resourceType}`);
    const models = await this.setCreateData(createDto);
    const result: any = await this.connection.transaction(
      async (entityManager: EntityManager) => {
        this.setRelations(models);
        await entityManager.save(models);
        return entityManager.getRepository(this.parentEntity).findOne(models[0].id, { relations: this.relations });
      },
    );
    return this.toDto(result);
  }

  async findAll(filters: FiltersDto, paginationDto: PaginationDto): Promise<{ data: ModelDto[], count: number }> {
    this.logger.info(`Getting ${this.resourceType} by filters ${filters}`);
    const { page, limit, sort } = paginationDto;
    const order = this.parseSort(sort);
    const where = {};
    Object.keys(filters).forEach((key) => {
      where[key] = filters[key];
    });
    const result: any = await this.connection.getRepository(this.parentEntity).findAndCount({
      take: limit, skip: limit * (page - 1), where, order, relations: this.relations,
    });
    return { data: result[0].map((res) => this.toDto(res)), count: result[1] };
  }

  async findById(id: number, returnEntity = false): Promise<ModelDto> {
    this.logger.info(`Getting ${this.resourceType} by ${id}`);
    const result: any = await this
      .connection.getRepository(this.parentEntity).findOne(id, { relations: this.relations });

    this.validateResult(id, result);
    if (returnEntity) {
      return result;
    }

    return this.toDto(result);
  }

  async update(id: number, updateDto: UpdateDto): Promise<ModelDto> {
    this.logger.info(`Updating ${this.resourceType} by ${id}`);

    const result: any = await this.findById(id, true);
    this.validateResult(id, result);

    const entities: any = this.setUpdateData(result, updateDto);
    await this.connection.manager
      .transaction(async (entityManager: EntityManager) => {
        await entityManager.save(entities);
      });
    const resultUpdated: any = await this.findById(id, true);
    return this.toDto(resultUpdated);
  }

  async delete(id: number, force = false): Promise<void> {
    this.logger.info(`Deleting ${this.resourceType} with id: ${id}. SoftDelete: ${!force}`);
    await this.connection.transaction(
      async (entityManager: EntityManager) => {
        const result: any = await this.findById(id, true);
        this.validateResult(id, result);
        if (force) {
          await entityManager.remove(result);
        } else {
          await entityManager.softRemove(result);
        }
      },
    );
  }

  abstract toDto(result: any): ModelDto;

  abstract validateResult(id: number, result: any): void;

  abstract setCreateData(createDto: CreateDto): any[];

  abstract setUpdateData(model: any, updateDto: UpdateDto): any[];

  abstract setRelations(entities: any[]): void;

  private parseSort(sort: string) {
    const sortParsed = {};
    const direction: 'ASC' | 'DESC' = /^-/.test(sort) ? 'DESC' : 'ASC';
    const property: string = direction === 'DESC' ? sort.replace('-', '') : sort;
    sortParsed[property] = direction;
    return sortParsed;
  }
}
