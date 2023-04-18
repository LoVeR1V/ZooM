import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './modules/users/entities/user.entity';

@Module({

  
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "neepman",
      "password": "1234",
      "database": "mydb",
      "entities": [UserEntity],
      "synchronize": true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})



export class AppModule {}
