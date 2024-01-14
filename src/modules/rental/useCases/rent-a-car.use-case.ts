import { UseCase } from '@app/shared/adapters/use-case.adapter';
import {
  IRentACarInput,
  IRentACarOutput,
} from '../interfaces/rent-a-car-use-case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IRentalRepo } from '../repository/rental.repository';
import { IVehicleRepo } from '@app/modules/vehicle/repository/vehicle.repository';
import { IDriverRepo } from '@app/modules/driver/repository/driver.repository';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { EVehicle } from '@app/modules/vehicle/flags/vehicle';
import { EDriver } from '@app/modules/driver/flags/driver.flags';

export type IRentACarUseCase = UseCase<IRentACarInput, IRentACarOutput>;
export const RentACarUseCaseProviderName = 'rent-a-car-use-case';

@Injectable()
export class RentACarUseCase implements IRentACarUseCase {
  constructor(
    @Inject('rental-repository')
    private readonly rentalRepo: IRentalRepo,
    @Inject('vehicle-repository')
    private readonly vehicleRepo: IVehicleRepo,
    @Inject('driver-repository')
    private readonly driverRepo: IDriverRepo,
  ) {}

  async execute(input: IRentACarInput): Promise<IRentACarOutput> {
    const driverFound = await this.driverRepo.exists<number>(
      input.driver_id,
      'driver_id',
    );
    if (!driverFound) {
      throw APIResponse.notFound('driver not found', EDriver.A404);
    }

    const vehicleFound = await this.vehicleRepo.exists<number>(
      input.vehicle_id,
      'vehicle_id',
    );
    if (!vehicleFound) {
      throw APIResponse.notFound('vehicle not found', EVehicle.A404);
    }

    const [driverHasARentedCar, vehicleWasRented] = await Promise.all([
      this.rentalRepo.driverHasARentedCar(input.driver_id),
      this.rentalRepo.vehicleWasRented(input.vehicle_id),
    ]);

    if (driverHasARentedCar) {
      throw APIResponse.conflict('driver has a rented car', EDriver.D409);
    }
    if (vehicleWasRented) {
      throw APIResponse.conflict('vehicle was rented', EVehicle.C409);
    }

    const newRentalRegistered = await this.rentalRepo.save({
      driver_id: input.driver_id,
      vehicle_id: input.vehicle_id,
      usageReason: input.usageReason,
      startedAt: new Date(),
    });

    return APIResponse.ok({
      rental_id: newRentalRegistered.rental_id,
      usageReason: newRentalRegistered.usageReason,
      startDate: newRentalRegistered.startDate,
      driver: {
        driver_id: driverFound.driver_id,
        name: driverFound.name,
        document: driverFound.document,
      },
      vehicle: {
        vehicle_id: vehicleFound.vehicle_id,
        color: vehicleFound.color,
        brand: vehicleFound.brand,
        plate: vehicleFound.plate,
      },
    });
  }
}
