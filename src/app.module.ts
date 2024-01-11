import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DriverModule } from './modules/driver/driver.module';

@Module({
  imports: [
    DriverModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.dev`],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
