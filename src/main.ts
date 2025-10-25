import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  // Global prefix and versioning
  const globalPrefix = configService.get<string>('app.globalPrefix') ?? 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({ type: VersioningType.URI });

  // Security and performance
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // CORS
  const corsEnabled = configService.get<boolean>('cors.enabled');
  const corsOrigin = configService.get<any>('cors.origin');
  if (corsEnabled) {
    app.enableCors({
      origin: corsOrigin === '*' ? true : corsOrigin,
      credentials: true,
    });
  }

  // Swagger
  const swaggerEnabled = configService.get<boolean>('swagger.enabled');
  if (swaggerEnabled) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(configService.get<string>('swagger.title')!)
      .setDescription(configService.get<string>('swagger.description')!)
      .setVersion(configService.get<string>('swagger.version')!)
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    const swaggerPath = configService.get<string>('swagger.path') ?? 'docs';
    SwaggerModule.setup(swaggerPath, app, document);
  }

  const host = configService.get<string>('app.host') ?? '0.0.0.0';
  const port = configService.get<number>('app.port') ?? 3000;
  await app.listen(port, host);
}
bootstrap();
