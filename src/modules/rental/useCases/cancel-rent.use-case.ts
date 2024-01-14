import { UseCase } from '@app/shared/adapters/use-case.adapter';
import { Inject, Injectable } from '@nestjs/common';
import {
  ICancelRentInput,
  ICancelRentOutput,
} from '../interfaces/cancel-rent-use-case.interface';
import { IRentalRepo } from '../repository/rental.repository';
import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { ERental } from '../flags/rental';

export type ICancelRentUseCase = UseCase<ICancelRentInput, ICancelRentOutput>;
export const CancelRentUseCaseNameProvider = 'cancel-rent-use-case';
@Injectable()
export class CancelRentUseCase implements ICancelRentUseCase {
  constructor(
    @Inject('rental-repository')
    private readonly rentRepo: IRentalRepo,
  ) {}

  async execute(input: ICancelRentInput): Promise<ICancelRentOutput> {
    const canceledDate = new Date();

    const rentFound = await this.rentRepo.exists('rental_id', input.rent_id);
    if (!rentFound) {
      throw APIResponse.notFound('rent not found', ERental.A404);
    }

    const canceled = await this.rentRepo.cancel(input.rent_id, canceledDate);
    if (!canceled) {
      throw APIResponse.internalServerError('cancel rental error');
    }

    return APIResponse.ok({
      endDate: canceledDate,
    });
  }
}
