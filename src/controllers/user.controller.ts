import { UserService } from '../services';
import { ApiResponse } from '../types';
import { IUser } from '../entities';
import { Request, Response } from 'express';
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(): Promise<ApiResponse<IUser[]>> {
    const users = await this.userService.getAllUsers();
    return { data: users, message: 'Success', status: 200 };
  }

  async getUserById(req: Request): Promise<ApiResponse<IUser>> {
    const id = req.params.id;
    const user = await this.userService.getUserById(id);
    return { data: user, message: 'Success', status: 200 };
  }
}
