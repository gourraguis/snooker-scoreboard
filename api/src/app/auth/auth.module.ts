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
import ConfigsModule from '../../config/config.module'
import { ConfigService } from '../../config/config.service'
import { ManagerModule } from '../manager/manager.module'
import { ConfigModule } from '@nestjs/config'
import * as Joi from '@hapi/joi'

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner]),
    ConfigsModule,
    OwnerModule,
    ManagerModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigsModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: { expiresIn: '14 days' },
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, OwnerService],
  controllers: [AuthController],
})
export class AuthModule {}
