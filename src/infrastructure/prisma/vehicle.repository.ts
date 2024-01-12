import { Vehicle } from '@app/modules/vehicle/interfaces/vehicle';
import {
  IFindAllVehiclesRepoInput,
  IVehicleRepo,
} from '@app/modules/vehicle/repository/vehicle.repository';
import { PrismaService } from './prisma.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VehicleRepository implements IVehicleRepo {
  constructor(private prisma: PrismaService) {}

  async save(data: Omit<Vehicle, 'Vehicle_id'>): Promise<Vehicle> {
    const created = await this.prisma.vehicle.create({
      data,
    });

    return created;
  }
  async exists<T>(value: T, key: string): Promise<Partial<Vehicle>> {
    return this.prisma.vehicle.findFirst({
      where: {
        [key]: value,
        deleted: false,
      },
    });
  }
  async update(id: number, value: Partial<Vehicle>): Promise<Partial<Vehicle>> {
    await this.prisma.vehicle.update({
      where: {
        vehicle_id: id,
      },
      data: value,
    });

    return value;
  }
  async remove(id: number): Promise<{ vehicle_id: number }> {
    return this.prisma.vehicle.update({
      where: {
        vehicle_id: id,
      },
      data: {
        deleted: true,
      },
    });
  }
  async findAll(data: IFindAllVehiclesRepoInput): Promise<Vehicle[]> {
    const drivers = await this.prisma.vehicle.findMany({
      where: data.filter,
      skip: (data.pagination.page - 1) * data.pagination.limit,
      take: data.pagination.limit,
    });

    return drivers;
  }
}
