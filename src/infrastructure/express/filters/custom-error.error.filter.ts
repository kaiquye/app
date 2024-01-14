import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(APIResponse)
export class CustomErrorFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: APIResponse<unknown>, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    console.log(new Date().toISOString(), exception);

    const responseBody: APIResponse<any> = {
      error: {
        message: exception.error.message,
        flag: exception.error.flag,
      },
      status: exception.status,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, exception.status);
  }
}
