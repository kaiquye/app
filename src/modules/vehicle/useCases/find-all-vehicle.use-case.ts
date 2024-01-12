import { UseCase } from '@app/shared/adapters/use-case.adapter';
import {
  IFindAllVehiclesInput,
  IFindAllVehiclesOutput,
} from '../interfaces/find-all-vehicle.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IVehicleRepo } from '../repository/vehicle.repository';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';

export type IFindAllVehiclesUseCase = UseCase<
  IFindAllVehiclesInput,
  IFindAllVehiclesOutput
>;

@Injectable()
export class FindAllVehiclesUseCase implements IFindAllVehiclesUseCase {
  constructor(
    @Inject('vehicle-repository')
    private readonly vehicleRepo: IVehicleRepo,
  ) {}

  async execute(input: IFindAllVehiclesInput): Promise<IFindAllVehiclesOutput> {
    const vehicleDbList = await this.vehicleRepo.findAll(input);
    return APIResponse.ok(vehicleDbList);
  }
}
