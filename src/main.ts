import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule,DocumentBuilder} from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options=new DocumentBuilder()
    .setTitle('中国大学录')
    .setDescription('中国大学录API')
    .setVersion('1.0')
    .addTag('college')
    .build();
  const document=SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api',app,document);

  await app.listen(3000);
}
bootstrap();
