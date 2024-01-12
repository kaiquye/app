import { Test, TestingModule } from '@nestjs/testing';
import { IVehicleRepo } from '../../repository/vehicle.repository';
import { CreateVehicleUseCase } from '../create-vehicle.use-case';
import { PrismaService } from '@app/infrastructure/prisma/prisma.config';
import { IUpdateVehicleUseCase, UpdateVehicleUseCase } from '../update-vehicle.use-case';

describe('[UPDATE - VEHICLE] USE CASE', () => {
  let useCase: IUpdateVehicleUseCase;
  let vehicleRepo: IVehicleRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        UpdateVehicleUseCase,
        {
          provide: 'vehicle-repository',
          useFactory: () => ({
            exists: jest.fn().mockResolvedValue(false),
            update: jest.fn().mockResolvedValue({ vehicle_id: 1 }),
          }),
        },
      ],
    }).compile();

    useCase = module.get<IUpdateVehicleUseCase>(UpdateVehicleUseCase);
    vehicleRepo = module.get<IVehicleRepo>('vehicle-repository');
  });

  it('should defined', () => {
    expect(useCase).toBeDefined();
    expect(vehicleRepo).toBeDefined();
  });

  it('should update a vehicle by id', async () => {
    jest.spyOn(vehicleRepo, 'exists').mockResolvedValueOnce({ vehicle_id: 1 });

    const input = {
      vehicle_id: 1,
      plate: 'AAA-3434',
      color: 'blue mica',
      brand: 'subaru',
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
});
