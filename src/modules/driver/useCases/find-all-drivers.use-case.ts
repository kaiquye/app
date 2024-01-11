import { UseCase } from '@app/shared/adapters/use-case.adapter';
import { Inject, Injectable } from '@nestjs/common';
import { IDriverRepo } from '../repository/driver.repository';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import {
  IFIndALlDriversInput,
  IFIndAllDriversOutput,
} from '../interfaces/find-all-drivers.interface';

export type IFIndAllDriversUseCase = UseCase<
  IFIndALlDriversInput,
  IFIndAllDriversOutput
>;

@Injectable()
export class FindAllDriversUseCase implements IFIndAllDriversUseCase {
  constructor(
    @Inject('driver-repository')
    private readonly driverRepo: IDriverRepo,
  ) {}

  async execute(input: IFIndALlDriversInput): Promise<IFIndAllDriversOutput> {
    const driversDbList = await this.driverRepo.findAll({
      name: input.name,
      pageInfo: input.pagination,
    });

    return APIResponse.ok(driversDbList);
  }
}
