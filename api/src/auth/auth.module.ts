import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { jwtConstants } from './constants'
import { LocalStrategy } from './local.strategy'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OwnerModule } from 'src/owner/owner.module'
import { OwnerService } from 'src/owner/owner.service'
import { Owner } from 'src/owner/entities/owner.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner]),
    OwnerModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, OwnerService],
  controllers: [AuthController],
})
export class AuthModule {}
