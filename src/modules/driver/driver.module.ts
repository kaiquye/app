import { DriverController } from '@app/infrastructure/express/controllers/driver/driver.controller';
import { PrismaService } from '@app/infrastructure/prisma/prisma.config';
import { Module } from '@nestjs/common';
import { CreateDriverUseCase } from './useCases/create-driver.use-case';
import { DriverRepo } from '@app/infrastructure/prisma/driver.repository';
import { UpdateDriverUseCase } from './useCases/update-driver.use-case';
import { RemoverDriverUseCase } from './useCases/remover-driver.use-case';
import { FindDriverUseCase } from './useCases/find-driver.use-case';
import { FindAllDriversUseCase } from './useCases/find-all-drivers.use-case';

@Module({
  imports: [],
  controllers: [DriverController],
  providers: [
    PrismaService,
    {
      provide: 'create-driver-use-case',
      useClass: CreateDriverUseCase,
    },
    {
      provide: 'update-driver-use-case',
      useClass: UpdateDriverUseCase,
    },
    {
      provide: 'remover-driver-use-case',
      useClass: RemoverDriverUseCase,
    },
    {
      provide: 'find-driver-use-case',
      useClass: FindDriverUseCase,
    },
    {
      provide: 'find-all-drivers-use-case',
      useClass: FindAllDriversUseCase,
    },
    {
      provide: 'driver-repository',
      useClass: DriverRepo,
    },
  ],
})
export class DriverModule {}
