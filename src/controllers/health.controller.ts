import { ApiResponse } from '../types';

export class HealthController {
  async getHealth(): Promise<ApiResponse<null>> {
    return { data: null, message: 'Success', status: 200 };
  }
}
