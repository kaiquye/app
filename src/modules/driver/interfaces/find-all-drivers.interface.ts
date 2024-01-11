import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { Driver } from './driver';

export interface IFIndALlDriversInput {
  name: string;
  pagination?: {
    page: number;
    limit: number;
  };
}

export type IFIndAllDriversOutput = APIResponse<Driver[]>;
