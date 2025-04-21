import { Request, Response } from 'express';
import { ApiResponse } from '../types';

export class HealthController {
  async getHealth(): Promise<ApiResponse<null>> {
    return { message: 'Success', status: 200 };
  }
}
