import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('EDU4U API')
    .setDescription('The EDU4U API description')
    .setVersion('1.0')
    .addTag('EDU4U') 
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
  });
}
bootstrap();
