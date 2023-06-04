import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Здесь вы можете указать путь к вашему файлу конфигурации, если он не находится в корне проекта
      envFilePath: 'E:\diplom\zoo-m\.env', // Например, если ваш файл называется `.env`, убедитесь, что он находится в корне проекта
    }),
  ],
})
export class ConfigAppModule {}