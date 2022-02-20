import { Module } from '@nestjs/common'
import { BoardModule } from '../board/board.module'
import { GameModule } from '../game/game.module'
import { SocketEmittersModule } from '../socket-emitters/socket-emitters.module'
import { BoardListenerGateway } from './board-listener.gateway'
import { ManagerListenerGateway } from './manager-listener.gateway'

@Module({
  imports: [GameModule, SocketEmittersModule, BoardModule],
  providers: [BoardListenerGateway, ManagerListenerGateway],
})
export class SocketListenersModule {}