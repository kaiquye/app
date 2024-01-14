import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { InternalServerErrorFIlter } from './infrastructure/express/filters/internal-server-error.filter';
import { BadRequestErrorFilter } from './infrastructure/express/filters/bad-request-error.filter';
import { CustomErrorFilter } from './infrastructure/express/filters/custom-error.error.filter';
import { SwaggerConfig } from './@config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerConfig(app);

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
