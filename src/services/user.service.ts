import { IUser } from '../entities';
import { UserRepository } from '../repositories/user.repository';
import { errorTypes } from '../utils/index';

const { ResourceNotFoundError } = errorTypes;
export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.findAll({ order: { createdAt: 'DESC' } });
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ResourceNotFoundError('User', id);
    }
    return user;
  }
}
