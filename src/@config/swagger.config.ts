import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export enum ESwaggerTAG {
  DRIVER = 'Driver',
  RENTAL = 'Rental',
  VEHICLE = 'Vehicle',
}

export function SwaggerConfig(app) {
  const config = new DocumentBuilder()
    .setTitle('driver crew')
    .setDescription('Driver crew  API')
    .setVersion('1.0')
    .addTag(ESwaggerTAG.DRIVER)
    .addTag(ESwaggerTAG.RENTAL)
    .addTag(ESwaggerTAG.VEHICLE)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
}
