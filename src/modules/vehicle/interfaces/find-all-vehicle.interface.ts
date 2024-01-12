import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { IPagination } from '@app/shared/structures/pagination.structure';
import { Vehicle } from './vehicle';

export type IFindAllVehiclesInput = {
  filter: {
    color: string;
    brand: string;
  };
  pagination: IPagination;
};

export type IFindAllVehiclesOutput = APIResponse<Vehicle[]>;
