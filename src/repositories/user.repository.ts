import { FindOptionsWhere, Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user.entity';

export class UserRepository {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }
  async getAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async getById(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }
  async getByClerkId(id: string): Promise<User | null> {
    return this.userRepo.findOneBy({ clerkId: id });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepo.update(id, user);
    const updatedUser = await this.getById(id);
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async createOrUpdate(user: Partial<User>): Promise<User> {
    if (!user.clerkId) {
      throw new Error('clerkId is required');
    }
    const existingUser = await this.getByClerkId(user.clerkId);
    if (existingUser) {
      return this.update(existingUser.id, user);
    }
    return this.create(user);
  }

  async count(conditions: FindOptionsWhere<User>): Promise<number> {
    return await this.userRepo.count({ where: conditions });
  }
}
