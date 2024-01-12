import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/infrastructure/prisma/prisma.config';
import { IDriverRepo } from '../../repository/driver.repository';
import { IUpdateDriverUseCase, UpdateDriverUseCase } from '../update-driver.use-case';

describe('[UPDATE-DRIVER] USE-CASE', () => {
  let useCase: IUpdateDriverUseCase;
  let driverRepo: IDriverRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        UpdateDriverUseCase,
        {
          provide: 'driver-repository',
          useFactory: () => ({
            exists: jest.fn().mockResolvedValue(false),
            update: jest.fn().mockResolvedValue({
              driver_id: 'uuid',
              name: 'kaic',
              document: 'document',
            }),
          }),
        },
      ],
    }).compile();

    useCase = module.get<IUpdateDriverUseCase>(UpdateDriverUseCase);
    driverRepo = module.get<IDriverRepo>('driver-repository');
  });

  test('should defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update a driver', async () => {
    jest.spyOn(driverRepo, 'exists').mockResolvedValueOnce({ name: '' });

    const input = {
      driver_id: 3,
      name: 'my name',
      document: '00000000',
    };

    const output = await useCase.execute(input);

    expect(output.data.driver_id).toBeDefined();
    expect(output.data.name).toBeDefined();
  });

  it('should return driver not found', async () => {
    try {
      const input = {
        driver_id: 1,
        name: 'kaique',
      };

      const output = await useCase.execute(input);

      expect(output.data.name).toBeDefined();
      fail('Expected an exception to be thrown, but none was thrown.');
    } catch (error) {
      expect(error.error.flag).toEqual('DRIVER::NOT-FOUND');
      expect(error.error.message).toEqual('driver not found');
      expect(error.status).toEqual(404);
    }
  });
});
