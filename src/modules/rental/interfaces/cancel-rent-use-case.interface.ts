import { APIResponse } from '@app/shared/adapters/api-response.adapter';

export type ICancelRentInput = {
  rent_id: number;
};

export type ICancelRentOutput = APIResponse<{
  endDate: Date;
}>;
