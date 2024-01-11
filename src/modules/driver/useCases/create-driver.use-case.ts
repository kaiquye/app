import {
  ICreateDriverInput,
  ICreateDriverOutput,
} from '../interfaces/create-driver.interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@app/shared/adapters/use-case.adapter';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { IDriverRepo } from '../repository/driver.repository';
import { EDriver } from '../flags/driver.flags';

export type ICreateDriverUseCase = UseCase<ICreateDriverInput, ICreateDriverOutput>;

@Injectable()
export class CreateDriverUseCase implements ICreateDriverUseCase {
  constructor(
    @Inject('driver-repository')
    private readonly driverRepo: IDriverRepo,
  ) {}
  async execute(data: ICreateDriverInput): Promise<ICreateDriverOutput> {
    const driverAlreadyExists = await this.driverRepo.exists<string>(
      data.document,
      'document',
    );
    if (driverAlreadyExists) {
      throw APIResponse.conflict('driver already exists', EDriver.A409);
    }

    const created = await this.driverRepo.save(data);
    return APIResponse.created({
      driver_id: created.driver_id,
      name: created.name,
    });
  }
}
