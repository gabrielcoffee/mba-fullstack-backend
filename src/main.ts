import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

// Creates the NestJS application instance
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
