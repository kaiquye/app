import { Test, TestingModule } from '@nestjs/testing';
import { IVehicleRepo } from '../../repository/vehicle.repository';
import { CreateVehicleUseCase } from '../create-vehicle.use-case';
import { PrismaService } from '@app/infrastructure/prisma/prisma.config';
import { IUpdateVehicleUseCase } from '../update-vehicle.use-case';
import { IRemoveVehicleUseCase, RemoveVehicleUseCase } from '../remove-vehicle.use-case';
import { IRentalRepo } from '@app/modules/rental/repository/rental.repository';

describe('[REMOVE - VEHICLE] USE CASE', () => {
  let useCase: IUpdateVehicleUseCase;
  let vehicleRepo: IVehicleRepo;
  let rentalRepo: IRentalRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        RemoveVehicleUseCase,
        {
          provide: 'vehicle-repository',
          useFactory: () => ({
            exists: jest.fn().mockResolvedValue(false),
            remove: jest.fn().mockResolvedValue({ vehicle_id: 1 }),
          }),
        },
        {
          provide: 'rental-repository',
          useFactory: () => ({
            findRentalInfoByVehicleId: jest.fn().mockResolvedValue(false),
          }),
        },
      ],
    }).compile();

    useCase = module.get<IRemoveVehicleUseCase>(RemoveVehicleUseCase);
    vehicleRepo = module.get<IVehicleRepo>('vehicle-repository');
    rentalRepo = module.get<IRentalRepo>('rental-repository');
  });

  it('should defined', () => {
    expect(useCase).toBeDefined();
    expect(vehicleRepo).toBeDefined();
    expect(rentalRepo).toBeDefined();
  });

  it('should remove a vehicle by id', async () => {
    jest.spyOn(vehicleRepo, 'exists').mockResolvedValueOnce({ vehicle_id: 1 });

    const input = {
      vehicle_id: 1,
    };

    const output = await useCase.execute(input);

    expect(output.data.vehicle_id).toBeDefined();
    expect(output.data.vehicle_id).toEqual(1);
  });

  it('should return not found vehicle', async () => {
    try {
      const input = {
        vehicle_id: 0,
        plate: 'AAA-3434',
        color: 'blue mica',
        brand: 'subaru',
      };
      await useCase.execute(input);
      fail('Expected an exception to be thrown, but none was thrown.');
    } catch (error) {
      expect(error.error.flag).toEqual('VEHICLE::NOT-FOUND');
      expect(error.error.message).toEqual('vehicle not found');
      expect(error.status).toEqual(404);
    }
  });

  it('should return not possible to delete, vehicle rented.', async () => {
    jest.spyOn(vehicleRepo, 'exists').mockResolvedValueOnce({ vehicle_id: 1 });
    jest.spyOn(rentalRepo, 'findRentalInfoByVehicleId').mockResolvedValueOnce({
      rental_id: 1,
      startedAt: new Date('2024-01-11T08:00:00Z'),
      endedAt: new Date('2024-01-11T18:00:00Z'),
      usageReason: 'Business trip',
      driver: {
        driver_id: 101,
        name: 'John Doe',
      },
      vehicle: {
        vehicle_id: 201,
        plate: 'ABC123',
        color: 'Blue',
        brand: 'Toyota',
      },
    });

    try {
      const input = {
        vehicle_id: 1,
      };
      await useCase.execute(input);
      fail('Expected an exception to be thrown, but none was thrown.');
    } catch (error) {
      expect(error.error.flag).toEqual('VEHICLE::VEHICLE-RENTAL');
      expect(error.error.message).toEqual("t's not possible to delete, vehicle rented.");
      expect(error.status).toEqual(409);
    }
  });
});
