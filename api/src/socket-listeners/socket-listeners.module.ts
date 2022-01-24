import { Module } from '@nestjs/common'
import { BoardModule } from 'src/board/board.module'
import { SocketEmittersModule } from 'src/socket-emitters/socket-emitters.module'
import { BoardListenerGateway } from './board-listener.gateway'
import { ManagerListenerGateway } from './manager-listener.gateway'

@Module({
  imports: [SocketEmittersModule, BoardModule],
  providers: [BoardListenerGateway, ManagerListenerGateway],
})
export class SocketListenersModule {}
