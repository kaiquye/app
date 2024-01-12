import { IsString, IsNotEmpty } from 'class-validator';

export class RendACarDto {
  @IsString({ message: 'usageReason should be a string' })
  @IsNotEmpty({ message: 'usageReason should not be empty' })
  usageReason: string;
}
