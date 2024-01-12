import { APIResponse } from '@app/shared/adapters/api-response.adapter';

export type ICreateVehicleInput = {
  plate: string;
  color: string;
  brand: string;
};

export type ICreateVehicleOutput = APIResponse<{
  vehicle_id: number;
}>;
