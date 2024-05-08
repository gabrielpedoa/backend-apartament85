import { NestFactory } from '@nestjs/core';
import { GlobalExceptionFilter } from './config/exceptions/filters/globalFilter';
import { NotFoundExceptionFilter } from './config/exceptions/filters/notFoundFilter';
import { PayloadExceptionFilter } from './config/exceptions/filters/payloadFilter';
import { UnauthorizedExceptionFilter } from './config/exceptions/filters/unauthorizedFilter';
import * as dotenv from 'dotenv';
import { AppModule } from './app/app.module';

dotenv.config();

const PORT = process.env.SV_PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new NotFoundExceptionFilter(),
    new PayloadExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );
  await app.listen(PORT);
}
bootstrap();
