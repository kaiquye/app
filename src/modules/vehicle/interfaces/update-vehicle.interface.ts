import { APIResponse } from '@app/shared/adapters/api-response.adapter';

export type IUpdateVehicleInput = {
  vehicle_id: number;
  plate?: string;
  color?: string;
  brand?: string;
};

export type IUpdateVehicleOutput = APIResponse<{
  vehicle_id: number;
}>;
