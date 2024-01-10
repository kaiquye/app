import { Module } from '@nestjs/common';
import { PrismaService } from 'infrastructure/database/prisma.config';
import { DriverController } from 'infrastructure/express/controllers/driver.controller';

@Module({
  imports: [],
  controllers: [DriverController],
  providers: [PrismaService],
})
export class DriverModule {}
