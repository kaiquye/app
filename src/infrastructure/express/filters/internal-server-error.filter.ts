import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class InternalServerErrorFIlter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    console.log(new Date().toISOString(), exception);

    const responseBody: APIResponse<any> = {
      error: {
        message: ['An internal error has occurred, please try again later.'],
        flag: 'internal.error',
      },
      status: 500,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
