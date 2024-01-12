import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { InternalServerErrorFIlter } from './infrastructure/express/filters/internal-server-error.filter';
import { BadRequestErrorFilter } from './infrastructure/express/filters/bad-request-error.filter';
import { CustomErrorFilter } from './infrastructure/express/filters/custom-error.error.filter';
// import * as swagger from 'swagger-ui-express';
// import swaggerDocument from '../docs/swagger.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use('/api/docs', swagger.serve, swagger.setup(swaggerDocument));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new InternalServerErrorFIlter(httpAdapterHost));
  app.useGlobalFilters(new BadRequestErrorFilter(httpAdapterHost));
  app.useGlobalFilters(new CustomErrorFilter(httpAdapterHost));

  await app.listen(process.env.PORT, () =>
    console.log('start server. PORT:', process.env.PORT),
  );
}
bootstrap();
