import { UseCase } from '@app/shared/adapters/use-case.adapter';
import { Inject, Injectable } from '@nestjs/common';
import {
  ICreateVehicleInput,
  ICreateVehicleOutput,
} from '../interfaces/create-vehicle.interfaces';
import { IVehicleRepo } from '../repository/vehicle.repository';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { EVehicle } from '../flags/vehicle';

export type ICreateVehicleUseCase = UseCase<ICreateVehicleInput, ICreateVehicleOutput>;

@Injectable()
export class CreateVehicleUseCase implements ICreateVehicleUseCase {
  constructor(
    @Inject('vehicle-repository')
    private readonly vehicleRepo: IVehicleRepo,
  ) {}

  async execute(input: ICreateVehicleInput): Promise<ICreateVehicleOutput> {
    const vehicleAlreadyExists = await this.vehicleRepo.exists<string>(
      input.plate,
      'plate',
    );

    if (vehicleAlreadyExists) {
      throw APIResponse.conflict(
        'A vehicle with this license plate is already in use.',
        EVehicle.A409,
      );
    }

    const vehicleDb = await this.vehicleRepo.save(input);
    return APIResponse.created({
      vehicle_id: vehicleDb.vehicle_id,
    });
  }
}
