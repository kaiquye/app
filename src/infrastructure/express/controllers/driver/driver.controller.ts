import { ICreateDriverUseCase } from '@app/modules/driver/useCases/create-driver.use-case';
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
import { CreateDriverDto } from './dtos/create-driver.dto';
import { UpdateDriverDto } from './dtos/update-driver.dto';
import { IUpdateDriverUseCase } from '@app/modules/driver/useCases/update-driver.use-case';
import { IRemoverDriverUseCase } from '@app/modules/driver/useCases/remover-driver.use-case';
import { IFindDriverUseCase } from '@app/modules/driver/useCases/find-driver.use-case';
import { IFIndAllDriversUseCase } from '@app/modules/driver/useCases/find-all-drivers.use-case';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ESwaggerTAG } from '@app/@config/swagger.config';

@ApiTags(ESwaggerTAG.DRIVER)
@Controller('/driver')
export class DriverController {
  constructor(
    @Inject('create-driver-use-case')
    private readonly createDriverUseCase: ICreateDriverUseCase,
    @Inject('update-driver-use-case')
    private readonly updateDriverUseCase: IUpdateDriverUseCase,
    @Inject('remover-driver-use-case')
    private readonly removerDriverUseCase: IRemoverDriverUseCase,
    @Inject('find-driver-use-case')
    private readonly findDriverUseCase: IFindDriverUseCase,
    @Inject('find-all-drivers-use-case')
    private readonly findAllDriversUseCase: IFIndAllDriversUseCase,
  ) {}

  @Post('/')
  async create(@Body() body: CreateDriverDto) {
    return this.createDriverUseCase.execute(body);
  }

  @ApiParam({ name: 'driverId', description: 'ID of the driver', type: 'integer' })
  @Patch('/:driver_id')
  async update(@Param() params, @Body() body: UpdateDriverDto) {
    const { driver_id } = params;

    return this.updateDriverUseCase.execute({
      driver_id: Number(driver_id),
      ...body,
    });
  }

  @ApiParam({ name: 'driverId', description: 'ID of the driver', type: 'integer' })
  @Delete('/:driver_id')
  async delete(@Param() params) {
    const { driver_id } = params;

    return this.removerDriverUseCase.execute({
      driver_id: Number(driver_id),
    });
  }

  @ApiParam({ name: 'driverId', description: 'ID of the driver', type: 'integer' })
  @Get('/:driver_id')
  async find(@Param() params) {
    const { driver_id } = params;

    return this.findDriverUseCase.execute({
      driver_id: Number(driver_id),
    });
  }

  @Get('/')
  async findAll(@Headers() headers, @Query() query) {
    const { page, limit } = headers;
    const { name } = query;

    return this.findAllDriversUseCase.execute({
      name,
      pagination: {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 5,
      },
    });
  }
}
