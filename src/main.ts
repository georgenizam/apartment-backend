import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import Fingerprint from 'express-fingerprint';
import { AppModule } from './app.module';

async function bootstrap() {
    const PORT = process.env.PORT ?? 5000;

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('API Apartment')
        .setVersion('1.0.0')
        .addBearerAuth(
            {
                description: `Please enter token in following format: Bearer <JWT>`,
                name: 'Authorization',
                bearerFormat: 'Bearer',
                scheme: 'Bearer',
                type: 'http',
                in: 'Header',
            },
            'accessToken'
        )
        .addCookieAuth('refreshToken', {
            scheme: 'Bearer',
            type: 'http',
            in: 'Header',
        })
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document, { customSiteTitle: 'API Apartment' });

    // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors({
        credentials: true,
        origin: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    });

    app.use(cookieParser());
    app.use(Fingerprint());

    await app.listen(PORT);
}

bootstrap();
