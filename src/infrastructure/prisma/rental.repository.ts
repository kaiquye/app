import { Injectable } from '@nestjs/common';
import {
  IRentalRepo,
  IFindRentalInfosById,
  ISaveRentalRepo,
} from '../../modules/rental/repository/rental.repository';
import { PrismaService } from './prisma.config';
import { Rental } from '@app/modules/rental/interfaces/rental';

@Injectable()
export class RentalRepo implements IRentalRepo {
  constructor(private prisma: PrismaService) {}

  async save(data: ISaveRentalRepo): Promise<Rental> {
    const rentalDb = await this.prisma.rental.create({
      data: {
        driverId: data.driver_id,
        startDate: data.startedAt,
        usageReason: data.usageReason,
        vehicleId: data.vehicle_id,
      },
    });

    return {
      rental_id: rentalDb.rental_id,
      startDate: rentalDb.startDate,
      endDate: rentalDb.endDate,
      usageReason: rentalDb.usageReason,
    };
  }
  async driverHasARentedCar(driver_id: number): Promise<boolean> {
    const count = await this.prisma.rental.count({ where: { driverId: driver_id } });
    return !!count;
  }
  async vehicleWasRented(Vehicle_id: number): Promise<boolean> {
    const count = await this.prisma.rental.count({ where: { vehicleId: Vehicle_id } });
    return !!count;
  }

  async findRentalInfoByVehicleId(Vehicle_id: number): Promise<IFindRentalInfosById> {
    const rentalDb = await this.prisma.rental.findFirst({
      where: {
        vehicleId: Vehicle_id,
        driver: {
          deleted: false,
        },
        vehicle: {
          deleted: false,
        },
      },
      include: {
        driver: {
          select: {
            driver_id: true,
            name: true,
            document: true,
          },
        },
        vehicle: {
          select: {
            vehicle_id: true,
            brand: true,
            plate: true,
            color: true,
          },
        },
      },
    });

    if (!rentalDb) {
      return null;
    }

    return {
      rental_id: rentalDb.rental_id,
      startedAt: rentalDb.startDate,
      endedAt: rentalDb.endDate || null,
      usageReason: rentalDb.usageReason || '',
      driver: {
        driver_id: rentalDb.driver.driver_id,
        name: rentalDb.driver.name,
      },
      vehicle: {
        vehicle_id: rentalDb.vehicle.vehicle_id,
        plate: rentalDb.vehicle.plate,
        color: rentalDb.vehicle.color,
        brand: rentalDb.vehicle.brand,
      },
    };
  }
}
