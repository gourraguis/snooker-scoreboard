import { Module } from '@nestjs/common'
import { BoardGateway } from './board.gateway'
import { BoardService } from './board.service'

@Module({
  providers: [BoardService, BoardGateway],
})
export class BoardModule {}
