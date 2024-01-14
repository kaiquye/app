import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { ICreateVehicleUseCase } from '@app/modules/vehicle/useCases/create-vehicle.use-case';
import { IFindAllVehiclesUseCase } from '../../../../modules/vehicle/useCases/find-all-vehicle.use-case';
import { IFindVehicleUseCase } from '@app/modules/vehicle/useCases/find-vehicle.use-case';
import { IRemoveVehicleUseCase } from '@app/modules/vehicle/useCases/remove-vehicle.use-case';
import { IUpdateVehicleUseCase } from '@app/modules/vehicle/useCases/update-vehicle.use-case';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { ESwaggerTAG } from '@app/@config/swagger.config';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags(ESwaggerTAG.VEHICLE)
@Controller('/vehicle')
export class VehicleController {
  constructor(
    @Inject('create-vehicle-use-case')
    private readonly createVehicleUseCase: ICreateVehicleUseCase,
    @Inject('find-vehicle-use-case')
    private readonly findVehicleUseCase: IFindVehicleUseCase,
    @Inject('find-all-vehicle-use-case')
    private readonly findAllVehiclesUseCase: IFindAllVehiclesUseCase,
    @Inject('remove-vehicle-use-case')
    private readonly removeVehicleUseCase: IRemoveVehicleUseCase,
    @Inject('update-vehicle-use-case')
    private readonly updateVehicleUseCase: IUpdateVehicleUseCase,
  ) {}

  @Post('/')
  async create(@Body() body: CreateVehicleDto) {
    return this.createVehicleUseCase.execute(body);
  }

  @ApiParam({ name: 'id', description: 'ID of the vehicle', type: 'integer' })
  @Get('/:vehicle_id')
  async findById(@Param() params: { vehicle_id: string }) {
    const { vehicle_id } = params;
    return this.findVehicleUseCase.execute({ vehicle_id: Number(vehicle_id) });
  }

  @ApiParam({ name: 'id', description: 'ID of the vehicle', type: 'integer' })
  @Delete('/:vehicle_id')
  async remove(@Param() params: { vehicle_id: string }) {
    const { vehicle_id } = params;
    return this.removeVehicleUseCase.execute({ vehicle_id: Number(vehicle_id) });
  }

  @ApiParam({ name: 'id', description: 'ID of the vehicle', type: 'integer' })
  @Patch('/:vehicle_id')
  async update(@Param() params: { vehicle_id: string }, @Body() body: UpdateVehicleDto) {
    const { vehicle_id } = params;
    return this.updateVehicleUseCase.execute({
      vehicle_id: Number(vehicle_id),
      ...body,
    });
  }

  @Get('/')
  async findAll(@Headers() headers, @Query() query) {
    const { page, limit } = headers;
    const { brand, color } = query;

    return this.findAllVehiclesUseCase.execute({
      filter: {
        color,
        brand,
      },
      pagination: {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 5,
      },
    });
  }
}
