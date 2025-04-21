import {
  DataSource,
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

export abstract class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;
  protected entity: EntityTarget<T>;

  constructor(dataSource: DataSource, entity: EntityTarget<T>) {
    this.entity = entity;
    this.repository = dataSource.getRepository<T>(entity);
  }

  async find(where: FindOptionsWhere<T>, options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find({ where, ...options });
  }
  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findById(id: number | string, options?: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne({
      ...options,
      where: { id } as unknown as FindOptionsWhere<T>,
    });
  }

  async findOneBy(where: FindOptionsWhere<T>, options?: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne({
      ...options,
      where,
    });
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity as any);
  }

  async update(id: number | string, data: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id, data as any);
    return this.findById(id);
  }

  // async delete(id: number | string): Promise<boolean> {
  //   const result = await this.repository.delete(id);
  //   return result.affected !== undefined && result.affected > 0;
  // }

  async count(options?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(options);
  }

  async exists(id: number | string): Promise<boolean> {
    const count = await this.repository.count({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
    return count > 0;
  }
}
