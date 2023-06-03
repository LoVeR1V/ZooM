import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { StaffModule } from '../staff/staff.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleEntity } from '../users/entities/user-role.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    UserModule,
    ConfigModule,
    StaffModule,
    TypeOrmModule.forFeature([UserRoleEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService:ConfigService) => ({ 
        secret: configService.get<string>('JWT_SECTET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
