import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './config/exceptions/filters/globalFilter';
import { NotFoundExceptionFilter } from './config/exceptions/filters/notFoundFilter';
import { PayloadExceptionFilter } from './config/exceptions/filters/payloadFilter';
import { UnauthorizedExceptionFilter } from './config/exceptions/filters/unauthorizedFilter';
import * as dotenv from 'dotenv';

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
