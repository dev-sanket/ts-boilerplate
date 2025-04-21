import { IUser } from '../types';
import { UserRepository } from '../repositories/user.repository';
import { errorTypes } from '../utils/index';
import { MoreThanOrEqual } from 'typeorm';

const { ResourceNotFoundError } = errorTypes;
export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.getAll();
  }

  async getUserByClerkId(userId: string): Promise<IUser> {
    const user = await this.userRepository.getByClerkId(userId);
    if (!user) {
      throw new ResourceNotFoundError('User', userId);
    }
    return user;
  }

  async hasUserTrainedModel(userId: number): Promise<boolean> {
    const trainingCount = await this.userRepository.count({
      id: userId,
      trainedModelCount: MoreThanOrEqual(0),
    });

    return trainingCount > 0;
  }

  async createOrUpdate(user: IUser): Promise<IUser> {
    return await this.userRepository.createOrUpdate(user);
  }
}
