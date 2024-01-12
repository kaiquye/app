import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateVehicleDto {
  @IsString({ message: 'Plate should be a non-empty string' })
  @IsNotEmpty({ message: 'Plate should not be empty' })
  @Matches(/^[A-Z]{3}\d{4}$/, { message: 'Invalid plate format' })
  plate: string;

  @IsString({ message: 'color should be a string' })
  @IsNotEmpty({ message: 'color should not be empty' })
  @Length(5, 35, { message: 'brand length should be between 10 and 20 characters' })
  color: string;

  @IsString({ message: 'brand should be a string' })
  @IsNotEmpty({ message: 'brand should not be empty' })
  @Length(5, 35, { message: 'brand length should be between 10 and 20 characters' })
  brand: string;
}
