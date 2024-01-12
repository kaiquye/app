import { UseCase } from '@app/shared/adapters/use-case.adapter';
import { Inject, Injectable } from '@nestjs/common';
import { IVehicleRepo } from '../repository/vehicle.repository';
import {
  IUpdateVehicleInput,
  IUpdateVehicleOutput,
} from '../interfaces/update-vehicle.interface';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { EVehicle } from '../flags/vehicle';

export type IUpdateVehicleUseCase = UseCase<IUpdateVehicleInput, IUpdateVehicleOutput>;

@Injectable()
export class UpdateVehicleUseCase implements IUpdateVehicleUseCase {
  constructor(
    @Inject('vehicle-repository')
    private readonly vehicleRepo: IVehicleRepo,
  ) {}

  async execute(input: IUpdateVehicleInput): Promise<IUpdateVehicleOutput> {
    const { vehicle_id, ...vehicle } = input;
    const vehicleFound = await this.vehicleRepo.exists<number>(vehicle_id, 'vehicle_id');
    if (!vehicleFound) {
      throw APIResponse.notFound('vehicle not found', EVehicle.A404);
    }

    await this.vehicleRepo.update(vehicle_id, vehicle);
    return APIResponse.ok({
      vehicle_id,
    });
  }
}
