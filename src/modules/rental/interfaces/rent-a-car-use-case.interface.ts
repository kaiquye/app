import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { Rental } from './rental';

export type IRentACarInput = {
  vehicle_id: number;
  driver_id: number;
  usageReason: string;
};

export type IRentACarOutput = APIResponse<Partial<Rental>>;
