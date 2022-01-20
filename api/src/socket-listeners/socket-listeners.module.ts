import { Module } from '@nestjs/common'
import { SocketEmittersModule } from 'src/socket-emitters/socket-emitters.module'
import { BoardListenerGateway } from './board-listener.gateway'
import { ManagerListenerGateway } from './manager-listener.gateway'

@Module({
  imports: [SocketEmittersModule],
  providers: [BoardListenerGateway, ManagerListenerGateway],
})
export class SocketListenersModule {}
