import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('API Docs')
        .setDescription('описание')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
//написать SSE
//дописать логику с токенами и auth
bootstrap();
