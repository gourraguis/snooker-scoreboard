import { CacheModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Board } from '../board/entities/board.entity'
import { Game } from './entities/game.entity'
import { GameController } from './game.controller'
import { GameService } from './game.service'

@Module({
  imports: [TypeOrmModule.forFeature([Game, Board]), CacheModule.register()],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
