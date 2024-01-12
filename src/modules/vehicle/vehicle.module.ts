import { PrismaService } from '@app/infrastructure/prisma/prisma.config';
import { Module } from '@nestjs/common';
import { CreateVehicleUseCase } from './useCases/create-vehicle.use-case';
import { FindAllVehiclesUseCase } from './useCases/find-all-vehicle.use-case';
import { FindVehicleUseCase } from './useCases/find-vehicle.use-case';
import { RemoveVehicleUseCase } from './useCases/remove-vehicle.use-case';
import { UpdateVehicleUseCase } from './useCases/update-vehicle.use-case';
import { VehicleController } from '../../infrastructure/express/controllers/vehicle/vehicle.controller';
import { RentalModule } from '../rental/rental.module';
import { VehicleRepository } from '@app/infrastructure/prisma/vehicle.repository';
import { RentalRepo } from '@app/infrastructure/prisma/rental.repository';

@Module({
  imports: [RentalModule],
  controllers: [VehicleController],
  providers: [
    PrismaService,
    {
      provide: 'rental-repository',
      useClass: RentalRepo,
    },
    {
      provide: 'vehicle-repository',
      useClass: VehicleRepository,
    },
    {
      provide: 'create-vehicle-use-case',
      useClass: CreateVehicleUseCase,
    },
    {
      provide: 'find-all-vehicle-use-case',
      useClass: FindAllVehiclesUseCase,
    },
    {
      provide: 'find-vehicle-use-case',
      useClass: FindVehicleUseCase,
    },
    {
      provide: 'remove-vehicle-use-case',
      useClass: RemoveVehicleUseCase,
    },
    {
      provide: 'update-vehicle-use-case',
      useClass: UpdateVehicleUseCase,
    },
  ],
})
export class VehicleModule {}
