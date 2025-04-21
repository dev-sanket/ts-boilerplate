import { Request, Response } from 'express';
import { UserService } from '../services';
import { ApiResponse, IUser } from '../types';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(): Promise<ApiResponse<IUser[]>> {
    const users = await this.userService.getAllUsers();
    return { data: users, message: 'Success', status: 200 };
  }

  async getUserById(id: string): Promise<ApiResponse<IUser>> {
    const user = await this.userService.getUserByClerkId(id);
    return { data: user, message: 'Success', status: 200 };
  }
}
