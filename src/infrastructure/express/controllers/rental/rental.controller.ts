import { IRentACarUseCase } from '@app/modules/rental/useCases/rent-a-car.use-case';
import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { RendACarDto } from './dtos/rent-a-car.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ESwaggerTAG } from '@app/@config/swagger.config';
import { ICancelRentUseCase } from '@app/modules/rental/useCases/cancel-rent.use-case';
import { IFindAllRentalsUseCase } from '@app/modules/rental/useCases/find-rentals.use-case';

@ApiTags(ESwaggerTAG.RENTAL)
@Controller('/rental')
export class RentalController {
  constructor(
    @Inject('rent-a-car-use-case')
    private readonly rentACarUseCase: IRentACarUseCase,
    @Inject('cancel-rental-use-case')
    private readonly cancelRentUseCase: ICancelRentUseCase,
    @Inject('find-rentals-use-case')
    private readonly findAllREntalsUseCase: IFindAllRentalsUseCase,
  ) {}

  @ApiParam({ name: 'driverId', description: 'ID of the drvier', type: 'integer' })
  @ApiParam({ name: 'vehicleId', description: 'ID of the vehicle', type: 'integer' })
  @Post('/driver/:driverId/vehicle/:vehicleId')
  async create(@Param() param, @Body() body: RendACarDto) {
    const { driverId, vehicleId } = param;
    return this.rentACarUseCase.execute({
      driver_id: Number(driverId),
      vehicle_id: Number(vehicleId),
      usageReason: body.usageReason,
    });
  }

  @ApiParam({ name: 'driver_id', description: 'driver id', type: 'integer' })
  @Get('/driver/:driver_id/rentals')
  async findAllByDriverId(@Param() param: { driver_id: string }) {
    const { driver_id } = param;
    return this.findAllREntalsUseCase.execute({ driver_id: Number(driver_id) });
  }

  @ApiParam({ name: 'rent_id', description: 'rental id', type: 'integer' })
  @Delete('/:rent_id')
  async cancel(@Param() param: { rent_id: string }) {
    const { rent_id } = param;
    return this.cancelRentUseCase.execute({ rent_id: Number(rent_id) });
  }
}
