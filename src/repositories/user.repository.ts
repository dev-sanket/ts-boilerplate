import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { User } from '../entities';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<User> {
  private userRepo: Repository<User>;
  constructor() {
    super(AppDataSource, User);
    this.userRepo = AppDataSource.getRepository(User);
  }

  async createOrUpdate(user: Partial<User>): Promise<User | null> {
    if (!user.id) {
      return this.create(user as User);
    }

    const existingUser = await this.findById(user.id);
    if (existingUser) {
      return this.update(existingUser.id, user);
    }
    return this.create(user as User);
  }
}
