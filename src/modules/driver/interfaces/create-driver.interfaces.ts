import { APIResponse } from '@app/shared/adapters/api-response.adapter';

export interface ICreateDriverInput {
  name: string;
  document: string;
}

export type ICreateDriverOutput = APIResponse<{
  driver_id: number;
  name: string;
}>;
