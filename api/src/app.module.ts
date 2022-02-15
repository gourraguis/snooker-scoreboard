import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoardModule } from './board/board.module'
import { ConfigModule } from './config/config.module'
import { ConfigService } from './config/config.service'
import { ManagerModule } from './manager/manager.module'
import { OwnerModule } from './owner/owner.module'
import { SocketEmittersModule } from './socket-emitters/socket-emitters.module'
import { SocketListenersModule } from './socket-listeners/socket-listeners.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
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
    AuthModule,
  ],
})
export class AppModule {}
