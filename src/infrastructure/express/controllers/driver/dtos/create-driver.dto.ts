import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({
    description: 'The name of the driver',
    example: 'John Doe',
  })
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @ApiProperty({
    description: 'The document of the driver',
    example: '12345abcde',
    minLength: 5,
    maxLength: 25,
  })
  @IsString({ message: 'Document should be a string' })
  @IsNotEmpty({ message: 'Document should not be empty' })
  @Length(5, 25, { message: 'Document length should be between 5 and 25 characters' })
  document: string;
}
