import { PrismaService } from '@app/infrastructure/prisma/prisma.config';
import { IRentACarUseCase, RentACarUseCase } from '../rent-a-car.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { IRentalRepo } from '../../repository/rental.repository';
import { IDriverRepo } from '@app/modules/driver/repository/driver.repository';
import { IVehicleRepo } from '@app/modules/vehicle/repository/vehicle.repository';
import { fail } from 'assert';

describe('[RENT A CAR] USE CASE', () => {
  let useCase: IRentACarUseCase;
  let rentRepo: IRentalRepo;
  let driverRepo: IDriverRepo;
  let vehicleRepo: IVehicleRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        RentACarUseCase,
        {
          provide: 'rental-repository',
          useFactory: () => ({
            save: jest.fn().mockResolvedValue(true),
            exists: jest.fn().mockResolvedValue(true),
            driverHasARentedCar: jest.fn().mockResolvedValue(false),
            vehicleWasRented: jest.fn().mockResolvedValue(false),
            findRentalInfoByVehicleId: jest.fn().mockResolvedValue(true),
          }),
        },
        {
          provide: 'vehicle-repository',
          useFactory: () => ({
            save: jest.fn().mockResolvedValue(true),
            exists: jest.fn().mockResolvedValue(true),
          }),
        },
        {
          provide: 'driver-repository',
          useFactory: () => ({
            save: jest.fn().mockResolvedValue(true),
            exists: jest.fn().mockResolvedValue(true),
          }),
        },
      ],
    }).compile();

    useCase = module.get<IRentACarUseCase>(RentACarUseCase);
    rentRepo = module.get<IRentalRepo>('rental-repository');
    driverRepo = module.get<IDriverRepo>('driver-repository');
    vehicleRepo = module.get<IVehicleRepo>('vehicle-repository');
  });

  it('should defined', () => {
    expect(useCase).toBeDefined();
    expect(rentRepo).toBeDefined();
    expect(driverRepo).toBeDefined();
    expect(vehicleRepo).toBeDefined();
  });

  it('should rent a car', async () => {
    const input = {
      driver_id: 1,
      vehicle_id: 1,
      usageReason: 'description',
    };

    const output = await useCase.execute(input);

    expect(output.data).toHaveProperty('rental_id');
    expect(output.data).toHaveProperty('driver');
    expect(output.data).toHaveProperty('vehicle');
  });

  it('should driver not found ', async () => {
    jest.spyOn(driverRepo, 'exists').mockReturnValueOnce(undefined);

    try {
      const input = {
        driver_id: 1,
        vehicle_id: 1,
        usageReason: 'description',
      };

      await useCase.execute(input);
      fail('error');
    } catch (error) {
      expect(error.error.flag).toEqual('DRIVER::NOT-FOUND');
      expect(error.error.message).toEqual('driver not found');
      expect(error.status).toEqual(404);
    }
  });

  it('should vehicle not found ', async () => {
    jest.spyOn(vehicleRepo, 'exists').mockReturnValueOnce(undefined);

    try {
      const input = {
        driver_id: 1,
        vehicle_id: 1,
        usageReason: 'description',
      };

      await useCase.execute(input);
      fail('error');
    } catch (error) {
      expect(error.error.flag).toEqual('VEHICLE::NOT-FOUND');
      expect(error.error.message).toEqual('vehicle not found');
      expect(error.status).toEqual(404);
    }
  });

  it('should vehicle not found ', async () => {
    jest.spyOn(vehicleRepo, 'exists').mockReturnValueOnce(undefined);

    try {
      const input = {
        driver_id: 1,
        vehicle_id: 1,
        usageReason: 'description',
      };

      await useCase.execute(input);
      fail('error');
    } catch (error) {
      expect(error.error.flag).toEqual('VEHICLE::NOT-FOUND');
      expect(error.error.message).toEqual('vehicle not found');
      expect(error.status).toEqual(404);
    }
  });
  it('should return driver has a rented car', async () => {
    jest
      .spyOn(rentRepo, 'driverHasARentedCar')
      .mockReturnValueOnce(Promise.resolve(true));
    jest.spyOn(rentRepo, 'vehicleWasRented').mockReturnValueOnce(Promise.resolve(true));

    try {
      const input = {
        driver_id: 1,
        vehicle_id: 1,
        usageReason: 'description',
      };

      await useCase.execute(input);
      fail('error');
    } catch (error) {
      console.log(error);
      expect(error.error.message).toEqual('driver has a rented car');
      expect(error.status).toEqual(409);
    }
  });

  it('should return vehicle was rented', async () => {
    jest
      .spyOn(rentRepo, 'driverHasARentedCar')
      .mockReturnValueOnce(Promise.resolve(false));
    jest.spyOn(rentRepo, 'vehicleWasRented').mockReturnValueOnce(Promise.resolve(true));

    try {
      const input = {
        driver_id: 1,
        vehicle_id: 1,
        usageReason: 'description',
      };

      await useCase.execute(input);
      fail('error');
    } catch (error) {
      expect(error.error.message).toEqual('vehicle was rented');
      expect(error.status).toEqual(409);
    }
  });
});
