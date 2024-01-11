import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/infrastructure/prisma/prisma.config';
import { IDriverRepo } from '../../repository/driver.repository';
import { IRemoverDriverUseCase, RemoverDriverUseCase } from '../remover-driver.use-case';

describe('[REMOVE-DRIVER] USE-CASE', () => {
  let useCase: IRemoverDriverUseCase;
  let driverRepo: IDriverRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        RemoverDriverUseCase,
        {
          provide: 'driver-repository',
          useFactory: () => ({
            exists: jest.fn().mockResolvedValue(false),
            remove: jest.fn().mockResolvedValue({ driver_id: 3 }),
          }),
        },
      ],
    }).compile();

    useCase = module.get<IRemoverDriverUseCase>(RemoverDriverUseCase);
    driverRepo = module.get<IDriverRepo>('driver-repository');
  });

  test('should defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should remover a driver', async () => {
    jest.spyOn(driverRepo, 'exists').mockResolvedValueOnce({ name: '' });

    const input = {
      driver_id: 3,
    };

    const output = await useCase.execute(input);

    expect(output.data.driver_id).toBeDefined();
  });

  it('should return driver not found', async () => {
    try {
      const input = {
        driver_id: 1,
      };
      await useCase.execute(input);
      fail('Expected an exception to be thrown, but none was thrown.');
    } catch (error) {
      expect(error.error.flag).toEqual('DRIVER::NOT-FOUND');
      expect(error.error.message).toEqual('driver not found');
      expect(error.status).toEqual(404);
    }
  });
});
