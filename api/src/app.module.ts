import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { jwtConstants } from './auth/constants'
import { BoardModule } from './board/board.module'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { ManagerModule } from './manager/manager.module'
import { OwnerModule } from './owner/owner.module'
import { SocketEmittersModule } from './socket-emitters/socket-emitters.module'
import { SocketListenersModule } from './socket-listeners/socket-listeners.module'

@Module({
  imports: [
    AuthModule,
    OwnerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.getTypeOrmConfig(),
    }),
    SocketEmittersModule,
    SocketListenersModule,
    ManagerModule,
    BoardModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' },
    }),
  ],
})
export class AppModule {}
