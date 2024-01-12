import { IRentACarUseCase } from '@app/modules/rental/useCases/rent-a-car.use-case';
import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { RendACarDto } from './dtos/rent-a-car.dto';

@Controller('/rental')
export class RentalController {
  constructor(
    @Inject('rent-a-car-use-case')
    private readonly rentACarUseCase: IRentACarUseCase,
  ) {}

  @Post('/driver/:driverId/vehicle/:vehicleId')
  async create(@Param() param, @Body() body: RendACarDto) {
    const { driverId, vehicleId } = param;
    return this.rentACarUseCase.execute({
      driver_id: Number(driverId),
      vehicle_id: Number(vehicleId),
      usageReason: body.usageReason,
    });
  }
}
