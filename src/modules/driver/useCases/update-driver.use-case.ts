import { UseCase } from '@app/shared/adapters/use-case.adapter';
import { Inject, Injectable } from '@nestjs/common';
import { IDriverRepo } from '../repository/driver.repository';
import {
  IUpdateDriverInput,
  IUpdateDriverOutput,
} from '../interfaces/update-driver.interface';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { EDriver } from '../flags/driver.flags';

export type IUpdateDriverUseCase = UseCase<IUpdateDriverInput, IUpdateDriverOutput>;

@Injectable()
export class UpdateDriverUseCase implements IUpdateDriverUseCase {
  constructor(
    @Inject('driver-repository')
    private readonly driverRepo: IDriverRepo,
  ) {}

  async execute(input: IUpdateDriverInput): Promise<IUpdateDriverOutput> {
    const { driver_id, ...driver } = input;

    const driverFound = await this.driverRepo.exists<number>(driver_id, 'driver_id');
    if (!driverFound) {
      throw APIResponse.notFound('driver not found', EDriver.A404);
    }

    if (driverFound.name === input.name) {
      throw APIResponse.conflict('Name is already in use', EDriver.B409);
    }

    if (driverFound?.document === input?.document) {
      throw APIResponse.conflict('Document is already in use', EDriver.C409);
    }

    const updated = await this.driverRepo.update(driver_id, driver);
    return APIResponse.ok(updated);
  }
}
