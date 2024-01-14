import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DriverModule } from './modules/driver/driver.module';
import { RentalModule } from './modules/rental/rental.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import * as joi from 'joi';
import { EnvConfig } from './@config/variables.config';

@Module({
  imports: [RentalModule, DriverModule, VehicleModule, ConfigModule.forRoot(EnvConfig)],
})
export class AppModule {}
