import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateDriverDto {
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsString({ message: 'Document should be a string' })
  @IsNotEmpty({ message: 'Document should not be empty' })
  @Length(5, 25, { message: 'Document length should be between 10 and 20 characters' })
  document: string;
}
