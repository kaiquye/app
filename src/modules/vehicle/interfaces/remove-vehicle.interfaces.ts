import { APIResponse } from '@app/shared/adapters/api-response.adapter';

export type IRemoveVehicleInput = {
  vehicle_id: number;
};

export type IRemoveVehicleOutput = APIResponse<{
  vehicle_id: number;
}>;
