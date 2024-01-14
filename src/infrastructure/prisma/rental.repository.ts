import { Injectable } from '@nestjs/common';
import {
  IRentalRepo,
  IFindRentalInfosById,
  ISaveRentalRepo,
  IFindAllRentalsRepoOutput,
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

  async exists<T>(key: string, value: T): Promise<boolean> {
    const rental = await this.prisma.rental.count({
      where: {
        [key]: value,
      },
    });

    return !!rental;
  }

  async findAllByDriverId(driverId: number): Promise<IFindAllRentalsRepoOutput> {
    const rentalsDbList = await this.prisma.rental.findMany({
      where: {
        driverId,
        deleted: false,
      },
      include: {
        driver: true,
        vehicle: true,
      },
    });

    if (!rentalsDbList) {
      return null;
    }

    return rentalsDbList.map((rental) => {
      return {
        rental_id: rental.rental_id,
        endDate: rental.endDate,
        startDate: rental.startDate,
        usageReason: rental.usageReason,
        driver: {
          driver_id: rental.driver.driver_id,
          name: rental.driver.name,
        },
        vehicle: {
          vehicle_id: rental.vehicle.vehicle_id,
          brand: rental.vehicle.brand,
          color: rental.vehicle.color,
          plate: rental.vehicle.plate,
        },
      };
    }) as IFindAllRentalsRepoOutput;
  }

  async cancel(rental_id: number, canceledDate: Date): Promise<boolean> {
    const rental = await this.prisma.rental.update({
      where: {
        rental_id,
      },
      data: {
        endDate: canceledDate,
      },
    });

    return !!rental;
  }
}
