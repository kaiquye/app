import { PrismaService } from '@app/infrastructure/prisma/prisma.config';
import { Module } from '@nestjs/common';
import { CreateVehicleUseCase } from './useCases/create-vehicle.use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: 'create-vehicle-use-case',
      useClass: CreateVehicleUseCase,
    },
  ],
})
export class VehicleModule {}
