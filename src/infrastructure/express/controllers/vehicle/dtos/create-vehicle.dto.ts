import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'plate vehicle',
    example: 'GRD1234',
  })
  @IsString({ message: 'Plate should be a non-empty string' })
  @IsNotEmpty({ message: 'Plate should not be empty' })
  @Matches(/^[A-Z]{3}\d{4}$/, { message: 'Invalid plate format' })
  plate: string;

  @ApiProperty({
    description: 'color vehicle',
    example: 'RED',
  })
  @IsString({ message: 'color should be a string' })
  @IsNotEmpty({ message: 'color should not be empty' })
  @Length(2, 35, { message: 'brand length should be between 2 and 35 characters' })
  color: string;

  @ApiProperty({
    description: 'brand vehicle',
    example: 'SUBARU',
  })
  @IsString({ message: 'brand should be a string' })
  @IsNotEmpty({ message: 'brand should not be empty' })
  @Length(5, 35, { message: 'brand length should be between 5 and 35 characters' })
  brand: string;
}
