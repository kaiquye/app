import { IPagination } from '@app/shared/structures/pagination.structure';
import { Vehicle } from '../interfaces/vehicle';

export interface IFindAllVehiclesRepoInput {
  filter: {
    color: string;
    brand: string;
  };
  pagination: IPagination;
}

export interface IVehicleRepo {
  save(data: Omit<Vehicle, 'Vehicle_id'>): Promise<Vehicle>;
  exists<T>(value: T, key: string): Promise<Partial<Vehicle> | undefined>;
  update(id: number, value: Partial<Vehicle>): Promise<Partial<Vehicle>>;
  remove(id: number): Promise<{ vehicle_id: number } | null>;
  findAll(data: IFindAllVehiclesRepoInput): Promise<Vehicle[]>;
}
