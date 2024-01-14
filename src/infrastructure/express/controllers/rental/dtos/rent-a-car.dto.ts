import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RendACarDto {
  @ApiProperty({
    description: 'usageReason',
    example: 'Planning a road trip with friends and need um spacious vehicle.',
  })
  @IsString({ message: 'usageReason should be a string' })
  @IsNotEmpty({ message: 'usageReason should not be empty' })
  usageReason: string;
}
