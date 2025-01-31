import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { CustomValidationPipe } from './common/pipes/custom-validation.pipe';
import { PrismaExceptionFilter } from './utils/prisma-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json({ limit: '10mb' }));

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   }),
  // );
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter());

  // const config = new DocumentBuilder()
  //   .setTitle('The Digital Coaching')
  //   .setDescription('Online Teaching Platform')
  //   .setVersion('1.0')
  //   .addTag('TDC')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
