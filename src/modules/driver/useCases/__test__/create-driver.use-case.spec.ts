import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@app/infrastructure/prisma/prisma.config';
import { IDriverRepo } from '../../repository/driver.repository';
import { CreateDriverUseCase, ICreateDriverUseCase } from '../create-driver.use-case';

describe('[CREATE-DRIVER] USE-CASE', () => {
  let useCase: ICreateDriverUseCase;
  let driverRepo: IDriverRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        CreateDriverUseCase,
        {
          provide: 'driver-repository',
          useFactory: () => ({
            exists: jest.fn().mockResolvedValue(false),
            save: jest.fn().mockResolvedValue({ driver_id: 'uuid', name: 'kaic' }),
          }),
        },
      ],
    }).compile();

    useCase = module.get<ICreateDriverUseCase>(CreateDriverUseCase);
    driverRepo = module.get<IDriverRepo>('driver-repository');
  });

  test('should defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new driver', async () => {
    const input = {
      name: 'kaique',
      document: '000.111.222-33',
    };

    const output = await useCase.execute(input);

    expect(output.data.name).toBeDefined();
  });

  it('should return already exists', async () => {
    jest.spyOn(driverRepo, 'exists').mockResolvedValueOnce({ name: '' });

    try {
      const input = {
        name: 'kaique',
        document: '000.111.222-33',
      };

      const output = await useCase.execute(input);

      expect(output.data.name).toBeDefined();
      fail('Expected an exception to be thrown, but none was thrown.');
    } catch (error) {
      expect(error.error.flag).toEqual('DRIVER::ALREADY-EXISTS');
      expect(error.error.message).toEqual('driver already exists');
      expect(error.status).toEqual(409);
    }
  });
});
