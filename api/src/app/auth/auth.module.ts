import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Owner } from '../owner/entities/owner.entity'
import { OwnerModule } from '../owner/owner.module'
import { OwnerService } from '../owner/owner.service'
import { ConfigModule } from '../../config/config.module'
import { ConfigService } from '../../config/config.service'
import { ManagerModule } from '../manager/manager.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner]),
    ConfigModule,
    OwnerModule,
    ManagerModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: { expiresIn: '14 days' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, OwnerService],
  controllers: [AuthController],
})
export class AuthModule {}
