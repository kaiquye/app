import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { Driver } from './driver';

export interface IFindDriverInput {
  driver_id: number;
}

export type IFindDriverOutput = APIResponse<Driver>;
