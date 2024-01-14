import { UseCase } from '@app/shared/adapters/use-case.adapter';
import {
  IFindRentalsInput,
  IFindRentalsOutput,
} from '../interfaces/find-rentals-use-case.interface';
import { IRentalRepo } from '../repository/rental.repository';
import { Inject, Injectable } from '@nestjs/common';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';

export type IFindAllRentalsUseCase = UseCase<IFindRentalsInput, IFindRentalsOutput>;
export type FindALlRentalsUseCaseProviderName = 'find-all-rental-use-case';

@Injectable()
export class FindALlRentalsUseCase implements IFindAllRentalsUseCase {
  constructor(
    @Inject('rental-repository')
    private rentalRepo: IRentalRepo,
  ) {}

  async execute(input: IFindRentalsInput): Promise<IFindRentalsOutput> {
    const rentalsList = await this.rentalRepo.findAllByDriverId(input.driver_id);

    return APIResponse.ok(rentalsList);
  }
}
