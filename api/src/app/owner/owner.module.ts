import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import ConfigModule from '../../config/config.module'
import { Board } from '../board/entities/board.entity'
import { Game } from '../game/entities/game.entity'
import { Manager } from '../manager/entities/manager.entity'
import { TwilioModule } from '../twilio/twilio.module'
import { Owner } from './entities/owner.entity'
import { OwnerController } from './owner.controller'
import { OwnerService } from './owner.service'

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Manager, Board, Game]), ConfigModule, TwilioModule],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
