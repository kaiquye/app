import { Inject, Injectable } from '@nestjs/common';
import {
  IRemoverDriverInput,
  IRemoverDriverOutput,
} from '../interfaces/remover-driver.interface';
import { EDriver } from '../flags/driver.flags';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { UseCase } from '@app/shared/adapters/use-case.adapter';
import { IDriverRepo } from '../repository/driver.repository';

export type IRemoverDriverUseCase = UseCase<IRemoverDriverInput, IRemoverDriverOutput>;

@Injectable()
export class RemoverDriverUseCase implements IRemoverDriverUseCase {
  constructor(
    @Inject('driver-repository')
    private readonly driverRepo: IDriverRepo,
  ) {}

  async execute(input: IRemoverDriverInput): Promise<IRemoverDriverOutput> {
    const driverFound = await this.driverRepo.exists<number>(
      input.driver_id,
      'driver_id',
    );
    if (!driverFound) {
      throw APIResponse.notFound('driver not found', EDriver.A404);
    }

    await this.driverRepo.remove(input.driver_id);
    return APIResponse.ok({
      driver_id: input.driver_id,
    });
  }
}
