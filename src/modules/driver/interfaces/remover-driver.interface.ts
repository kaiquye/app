import { APIResponse } from '@app/shared/adapters/api-response.adapter';

export interface IRemoverDriverInput {
  driver_id: number;
}

export type IRemoverDriverOutput = APIResponse<{
  driver_id: number;
}>;
