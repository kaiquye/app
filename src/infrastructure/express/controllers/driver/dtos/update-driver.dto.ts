import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateDriverDto {
  @ApiProperty({
    description: 'driver name',
    example: 'Kaique',
  })
  @IsOptional()
  @IsString({ message: 'Name should be a string' })
  name: string;

  @ApiProperty({
    description: 'document driver',
    example: '00011122233',
  })
  @IsOptional()
  @IsString({ message: 'Document should be a string' })
  @Length(5, 25, { message: 'Document length should be between 10 and 20 characters' })
  document: string;
}
