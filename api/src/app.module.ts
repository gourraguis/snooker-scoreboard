import { Module } from '@nestjs/common'
import { BoardModule } from './board/board.module'
import { ManagerModule } from './manager/manager.module'
import { OwnerModule } from './owner/owner.module'
import { SocketEmittersModule } from './socket-emitters/socket-emitters.module'
import { SocketListenersModule } from './socket-listeners/socket-listeners.module'

@Module({
  imports: [SocketEmittersModule, SocketListenersModule, OwnerModule, ManagerModule, BoardModule],
})
export class AppModule {}
