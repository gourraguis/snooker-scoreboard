import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { OwnerModule } from '../owner/owner.module'
import { OwnerService } from '../owner/owner.service'
import ConfigModule from '../../config/config.module'
import { ConfigService } from '../../config/config.service'
import { ManagerModule } from '../manager/manager.module'
import { TwilioModule } from '../twilio/twilio.module'

@Module({
  imports: [
    ConfigModule,
    OwnerModule,
    ManagerModule,
    PassportModule,
    TwilioModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: { expiresIn: '90 days' },
      }),
    }),
    OwnerModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
