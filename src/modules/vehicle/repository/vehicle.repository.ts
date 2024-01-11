import { Vehicle } from '../interfaces/vehicle';

export interface IVehicleRepo {
  save(data: Omit<Vehicle, 'Vehicle_id'>): Promise<Vehicle>;
  exists<T>(value: T, key: string): Promise<Partial<Vehicle> | undefined>;
}
