import { Controller, Post } from '@nestjs/common';
import { PrismaService } from 'infrastructure/database/prisma.config';

@Controller('/driver')
export class DriverController {
  constructor(private prisma: PrismaService) {}

  @Post('/')
  async test() {
    await this.prisma.user.create({
      data: {
        email: 'tested',
        name: 'tested',
      },
    });
  }
}
