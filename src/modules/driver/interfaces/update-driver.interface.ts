import { APIResponse } from '@app/shared/adapters/api-response.adapter';

export interface IUpdateDriverInput {
  driver_id: number;
  name?: string;
  document?: string;
}

export type IUpdateDriverOutput = APIResponse<{
  driver_id?: number;
  name: string;
  document: string;
}>;
