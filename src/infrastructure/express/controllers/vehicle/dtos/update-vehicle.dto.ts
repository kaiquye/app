import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches, IsOptional } from 'class-validator';

export class UpdateVehicleDto {
  @ApiProperty({
    description: 'plate vehicle',
    example: 'GTE1234',
  })
  @IsOptional()
  @IsString({ message: 'Plate should be a non-empty string' })
  @Matches(/^[A-Z]{3}\d{4}$/, { message: 'Invalid plate format' })
  plate?: string;

  @ApiProperty({
    description: 'color vehicle',
    example: 'RED',
  })
  @IsOptional()
  @Length(5, 35, { message: 'brand length should be between 10 and 20 characters' })
  color?: string;

  @ApiProperty({
    description: 'brand vehicle',
    example: 'SUBARU',
  })
  @IsString({ message: 'color should be a string' })
  @IsString({ message: 'brand should be a string' })
  @Length(5, 35, { message: 'brand length should be between 10 and 20 characters' })
  brand?: string;
}
