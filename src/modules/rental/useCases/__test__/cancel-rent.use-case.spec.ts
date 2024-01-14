import { PrismaService } from '@app/infrastructure/prisma/prisma.config';
import { Test, TestingModule } from '@nestjs/testing';
import { CancelRentUseCase, ICancelRentUseCase } from '../cancel-rent.use-case';
import { IRentalRepo } from '../../repository/rental.repository';

describe('[CANCEL RENT] USE CASE', () => {
  let useCase: ICancelRentUseCase;
  let repo: IRentalRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        CancelRentUseCase,
        {
          provide: 'rental-repository',
          useFactory: () => ({
            cancel: jest.fn().mockResolvedValue(true),
            exists: jest.fn().mockResolvedValue(true),
          }),
        },
      ],
    }).compile();

    useCase = module.get<ICancelRentUseCase>(CancelRentUseCase);
    repo = module.get<IRentalRepo>('rental-repository');
  });

  it('should defined', () => {
    expect(useCase).toBeDefined();
    expect(repo).toBeDefined();
  });

  it('should return cancel a rent', async () => {
    const Input = {
      rent_id: 1,
    };

    const response = await useCase.execute(Input);

    expect(response.data).toHaveProperty('endDate');
    expect(response.data.endDate).toBeInstanceOf(Date);
  });

  it('should return not found rent', async () => {
    jest.spyOn(repo, 'exists').mockResolvedValueOnce(false);
    try {
      const Input = {
        rent_id: 1,
      };

      await useCase.execute(Input);
      fail('error');
    } catch (error) {
      expect(error.error.flag).toEqual('RENTAL::NOT-FOUND');
      expect(error.error.message).toEqual('rent not found');
      expect(error.status).toEqual(404);
    }
  });
});
