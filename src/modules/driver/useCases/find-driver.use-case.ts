import { UseCase } from '@app/shared/adapters/use-case.adapter';
import { Inject, Injectable } from '@nestjs/common';
import { IDriverRepo } from '../repository/driver.repository';
import {
  IFindDriverInput,
  IFindDriverOutput,
} from '../interfaces/find-driver.interface';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { EDriver } from '../flags/driver.flags';
import { Driver } from '@prisma/client';

export type IFindDriverUseCase = UseCase<IFindDriverInput, IFindDriverOutput>;

@Injectable()
export class FindDriverUseCase implements IFindDriverUseCase {
  constructor(
    @Inject('driver-repository')
    private readonly driverRepo: IDriverRepo,
  ) {}

  async execute(input: IFindDriverInput): Promise<IFindDriverOutput> {
    const driverFound = await this.driverRepo.exists<number>(
      input.driver_id,
      'driver_id',
    );
    if (!driverFound) {
      throw APIResponse.notFound('driver not found', EDriver.A404);
    }

    return APIResponse.ok(driverFound as Driver);
  }
}
