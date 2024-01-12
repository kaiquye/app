import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { Driver } from './driver';
import { IPagination } from '@app/shared/structures/pagination.structure';

export interface IFIndALlDriversInput {
  name: string;
  pagination?: IPagination;
}

export type IFIndAllDriversOutput = APIResponse<Driver[]>;
