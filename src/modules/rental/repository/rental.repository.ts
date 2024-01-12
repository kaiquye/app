import { Rental } from '../interfaces/rental';

export interface IFindRentalInfosById {
  rental_id: number;
  startedAt: Date;
  endedAt?: Date;
  usageReason: string;
  driver: {
    driver_id: number;
    name: string;
  };
  vehicle: {
    vehicle_id: number;
    plate: string;
    color: string;
    brand: string;
  };
}

export interface ISaveRentalRepo {
  vehicle_id: number;
  driver_id: number;
  usageReason: string;
  startedAt: Date;
}

export interface IRentalRepo {
  save(data: ISaveRentalRepo): Promise<Rental>;
  findRentalInfoByVehicleId(Vehicle_id: number): Promise<IFindRentalInfosById | null>;
  driverHasARentedCar(driver_ud: number): Promise<boolean>;
  vehicleWasRented(Vehicle_id: number): Promise<boolean>;
}
