import { Module } from '@nestjs/common'
import { ManagerGateway } from './manager.gateway'
import { BoardGateway } from '../board/board.gateway'
@Module({
  providers: [ManagerGateway, BoardGateway],
})
export class ManagerModule {}
