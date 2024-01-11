import { Test, TestingModule } from '@nestjs/testing';
import { IVehicleRepo } from '../../repository/vehicle.repository';
import { CreateVehicleUseCase, ICreateVehicleUseCase } from '../create-vehicle.use-case';
import { PrismaService } from '@app/infrastructure/prisma/prisma.config';

describe('[CREATE - VEHICLE] USE CASE', () => {
  let useCase: ICreateVehicleUseCase;
  let vehicleRepo: IVehicleRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        CreateVehicleUseCase,
        {
          provide: 'vehicle-repository',
          useFactory: () => ({
            exists: jest.fn().mockResolvedValue(false),
            save: jest.fn().mockResolvedValue({ vehicle_id: 'uuid' }),
          }),
        },
      ],
    }).compile();

    useCase = module.get<ICreateVehicleUseCase>(CreateVehicleUseCase);
    vehicleRepo = module.get<IVehicleRepo>('vehicle-repository');
  });

  it('should defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new vehicle', async () => {
    const input = {
      plate: 'AAA-3434',
      color: 'blue mica',
      brand: 'subaru',
    };

    const output = await useCase.execute(input);

    expect(output.data.vehicle_id).toBeDefined();
  });

  it('should a vehicle with this license plate is already in use.', async () => {
    try {
      jest.spyOn(vehicleRepo, 'exists').mockResolvedValueOnce({ vehicle_id: '' });
      const input = {
        plate: 'AAA-3434',
        color: 'blue mica',
        brand: 'subaru',
      };
      await useCase.execute(input);
      fail('Expected an exception to be thrown, but none was thrown.');
    } catch (error) {
      expect(error.error.flag).toEqual('VEHICLE::ALREADY-EXISTS');
      expect(error.error.message).toEqual(
        'A vehicle with this license plate is already in use.',
      );
      expect(error.status).toEqual(409);
    }
  });
});
