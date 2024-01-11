import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateDriverDto {
  @IsOptional()
  @IsString({ message: 'Name should be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Document should be a string' })
  @Length(5, 25, { message: 'Document length should be between 10 and 20 characters' })
  document: string;
}
