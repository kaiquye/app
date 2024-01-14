import { PrismaService } from '@app/infrastructure/prisma/prisma.config';
import { RentalRepo } from '@app/infrastructure/prisma/rental.repository';
import { Module } from '@nestjs/common';
import { RentACarUseCase } from './useCases/rent-a-car.use-case';
import { DriverRepo } from '@app/infrastructure/prisma/driver.repository';
import { VehicleRepository } from '@app/infrastructure/prisma/vehicle.repository';
import { CreateVehicleUseCase } from '../vehicle/useCases/create-vehicle.use-case';
import { FindVehicleUseCase } from '../vehicle/useCases/find-vehicle.use-case';
import { FindDriverUseCase } from '../driver/useCases/find-driver.use-case';
import { RentalController } from '@app/infrastructure/express/controllers/rental/rental.controller';
import { CancelRentUseCase } from './useCases/cancel-rent.use-case';
import { FindALlRentalsUseCase } from './useCases/find-rentals.use-case';

@Module({
  controllers: [RentalController],
  providers: [
    PrismaService,
    {
      provide: 'find-rentals-use-case',
      useClass: FindALlRentalsUseCase,
    },
    {
      provide: 'cancel-rental-use-case',
      useClass: CancelRentUseCase,
    },
    {
      provide: 'create-vehicle-use-case',
      useClass: CreateVehicleUseCase,
    },
    {
      provide: 'find-vehicle-use-case',
      useClass: FindVehicleUseCase,
    },
    {
      provide: 'find-driver-use-case',
      useClass: FindDriverUseCase,
    },
    {
      provide: 'driver-repository',
      useClass: DriverRepo,
    },
    {
      provide: 'vehicle-repository',
      useClass: VehicleRepository,
    },
    {
      provide: 'rental-repository',
      useClass: RentalRepo,
    },
    {
      provide: 'rent-a-car-use-case',
      useClass: RentACarUseCase,
    },
  ],
  exports: [
    {
      provide: 'rental-repository',
      useClass: RentalRepo,
    },
  ],
})
export class RentalModule {}
