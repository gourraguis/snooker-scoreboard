import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './app/auth/auth.module'
import { BoardModule } from './app/board/board.module'
import { GameModule } from './app/game/game.module'
import { ManagerModule } from './app/manager/manager.module'
import { OwnerModule } from './app/owner/owner.module'
import ConfigsModule from './config/config.module'
import { ConfigService } from './config/config.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigsModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.getTypeOrmConfig(),
    }),
    OwnerModule,
    ManagerModule,
    GameModule,
    BoardModule,
    PassportModule,
    AuthModule,
  ],
})
export class AppModule {}
