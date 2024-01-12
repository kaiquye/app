import { UseCase } from '@app/shared/adapters/use-case.adapter';
import { Inject, Injectable } from '@nestjs/common';
import { IVehicleRepo } from '../repository/vehicle.repository';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { EVehicle } from '../flags/vehicle';
import {
  IRemoveVehicleInput,
  IRemoveVehicleOutput,
} from '../interfaces/remove-vehicle.interfaces';
import { IRentalRepo } from '@app/modules/rental/repository/rental.repository';

export type IRemoveVehicleUseCase = UseCase<IRemoveVehicleInput, IRemoveVehicleOutput>;

@Injectable()
export class RemoveVehicleUseCase implements IRemoveVehicleUseCase {
  constructor(
    @Inject('vehicle-repository')
    private readonly vehicleRepo: IVehicleRepo,
    @Inject('rental-repository')
    private readonly rentalRepo: IRentalRepo,
  ) {}

  async execute(input: IRemoveVehicleInput): Promise<IRemoveVehicleOutput> {
    const vehicleFound = await this.vehicleRepo.exists<number>(
      input.vehicle_id,
      'vehicle_id',
    );
    if (!vehicleFound) {
      throw APIResponse.notFound('vehicle not found', EVehicle.A404);
    }

    const rentedVehicle = await this.rentalRepo.findRentalInfoByVehicleId(
      input.vehicle_id,
    );
    if (rentedVehicle) {
      throw APIResponse.conflict(
        "t's not possible to delete, vehicle rented.",
        EVehicle.B409,
      );
    }

    const deleted = await this.vehicleRepo.remove(input.vehicle_id);

    return APIResponse.ok({
      vehicle_id: deleted.vehicle_id,
    });
  }
}
