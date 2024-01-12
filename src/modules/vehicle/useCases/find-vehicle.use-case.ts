import { UseCase } from '@app/shared/adapters/use-case.adapter';
import { Inject, Injectable } from '@nestjs/common';
import { IVehicleRepo } from '../repository/vehicle.repository';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { EVehicle } from '../flags/vehicle';
import {
  IFindVehicleInput,
  IFindVehicleOutput,
} from '../interfaces/find-vehicle.interfaces';

export type IFindVehicleUseCase = UseCase<IFindVehicleInput, IFindVehicleOutput>;

@Injectable()
export class FindVehicleUseCase implements IFindVehicleUseCase {
  constructor(
    @Inject('vehicle-repository')
    private readonly vehicleRepo: IVehicleRepo,
  ) {}

  async execute(input: IFindVehicleInput): Promise<IFindVehicleOutput> {
    const vehicleFound = await this.vehicleRepo.exists<number>(
      input.vehicle_id,
      'vehicle_id',
    );
    if (!vehicleFound) {
      throw APIResponse.notFound('vehicle not found', EVehicle.A404);
    }

    return APIResponse.ok(vehicleFound);
  }
}
