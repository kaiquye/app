import { Driver } from '@app/modules/driver/interfaces/driver';
import {
  IDriverRepo,
  IFindALlFilter,
  ISaveResponse,
} from '@app/modules/driver/repository/driver.repository';
import { PrismaService } from './prisma.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverRepo implements IDriverRepo {
  constructor(private prisma: PrismaService) {}

  async save(data: Driver): Promise<ISaveResponse> {
    const created = await this.prisma.driver.create({
      data: {
        name: data.name,
        document: data.document,
      },
    });

    return {
      driver_id: created.driver_id,
      name: created.name,
    };
  }

  async exists<T>(value: T, key: string): Promise<Partial<Driver>> {
    return this.prisma.driver.findFirst({
      where: {
        [key]: value,
        deleted: false,
      },
    });
  }

  async update(
    driver_id: number,
    data: Partial<Omit<Driver, 'driver_id'>>,
  ): Promise<Driver> {
    return this.prisma.driver.update({
      where: { driver_id },
      data,
    });
  }

  async remove(driver_id: number): Promise<void> {
    await this.prisma.driver.update({
      where: {
        driver_id,
      },
      data: {
        deleted: true,
      },
    });
  }

  findAll(filter: IFindALlFilter): Promise<Driver[]> {
    const drivers = this.prisma.driver.findMany({
      where: {
        name: filter.name,
        deleted: false,
      },
      skip: (filter.pageInfo.page - 1) * filter.pageInfo.limit,
      take: filter.pageInfo.limit,
    });

    return drivers;
  }
}
