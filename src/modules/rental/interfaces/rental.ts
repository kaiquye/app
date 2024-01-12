import { Driver } from '@app/modules/driver/interfaces/driver';
import { Vehicle } from '@app/modules/vehicle/interfaces/vehicle';

export interface Rental {
  rental_id: number;
  startDate: Date;
  endDate?: Date;
  usageReason: string;
  driver?: Driver;
  vehicle?: Vehicle;
}
