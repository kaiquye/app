import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DriverModule } from './modules/driver/driver.module';
import { RentalModule } from './modules/rental/rental.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import * as joi from 'joi';

@Module({
  imports: [
    RentalModule,
    DriverModule,
    VehicleModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.dev`],
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().required(),
        NODE_ENV: joi.string().valid('dev', 'sandbox', 'production', 'test'),
        DATABASE_URL: joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
