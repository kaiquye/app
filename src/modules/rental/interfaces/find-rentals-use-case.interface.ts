import { APIResponse } from '@app/shared/adapters/api-response.adapter';

export type IFindRentalsInput = {
  driver_id: number;
};

export type IFindRentalsOutput = APIResponse<
  {
    rental_id: number;
    startDate: Date;
    endDate: Date;
    usageReason: string;
    driver: {
      driver_id: number;
      name: string;
    };
    vehicle: {
      vehicle_id: number;
      plate: string;
      color: string;
      brand: string;
    };
  }[]
>;
