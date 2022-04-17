import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Board } from '../board/entities/board.entity'
import { Game } from '../game/entities/game.entity'
import { TwilioModule } from '../twilio/twilio.module'
import { Manager } from './entities/manager.entity'
import { ManagerController } from './manager.controller'
import { ManagerService } from './manager.service'

@Module({
  imports: [TypeOrmModule.forFeature([Manager, Board, Game]), TwilioModule],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
