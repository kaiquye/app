import { PrismaService } from 'infrastructure/database/prisma.config';
export declare class DriverController {
    private prisma;
    constructor(prisma: PrismaService);
    test(): Promise<void>;
}
