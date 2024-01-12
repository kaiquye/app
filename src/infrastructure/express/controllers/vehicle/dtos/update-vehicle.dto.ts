import { IsString, Length, Matches, IsOptional } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString({ message: 'Plate should be a non-empty string' })
  @Matches(/^[A-Z]{3}\d{4}$/, { message: 'Invalid plate format' })
  plate?: string;

  @IsOptional()
  @Length(5, 35, { message: 'brand length should be between 10 and 20 characters' })
  color?: string;

  @IsString({ message: 'color should be a string' })
  @IsString({ message: 'brand should be a string' })
  @Length(5, 35, { message: 'brand length should be between 10 and 20 characters' })
  brand?: string;
}
