import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Manager } from '../manager/entities/manager.entity'
import { Game } from './entities/game.entity'
import { GameController } from './game.controller'
import { GameService } from './game.service'

@Module({
  imports: [TypeOrmModule.forFeature([Game, Manager])],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
