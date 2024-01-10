"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverController = void 0;
const common_1 = require("@nestjs/common");
const prisma_config_1 = require("../../database/prisma.config");
let DriverController = class DriverController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async test() {
        await this.prisma.user.create({
            data: {
                email: 'tested',
                name: 'tested',
            },
        });
    }
};
exports.DriverController = DriverController;
__decorate([
    (0, common_1.Post)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DriverController.prototype, "test", null);
exports.DriverController = DriverController = __decorate([
    (0, common_1.Controller)('/driver'),
    __metadata("design:paramtypes", [prisma_config_1.PrismaService])
], DriverController);
//# sourceMappingURL=driver.controller.js.map