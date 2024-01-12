import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { Vehicle } from './vehicle';

export type IFindVehicleInput = {
  vehicle_id: number;
};

export type IFindVehicleOutput = APIResponse<Partial<Vehicle>>;
