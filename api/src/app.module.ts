import { Module } from '@nestjs/common'
import { ManagerModule } from './manager/manager.module'
import { OwnerModule } from './owner/owner.module'
import { SocketEmittersModule } from './socket-emitters/socket-emitters.module'
import { SocketListenersModule } from './socket-listeners/socket-listeners.module'
import { TableModule } from './table/table.module'

@Module({
  imports: [SocketEmittersModule, SocketListenersModule, OwnerModule, ManagerModule, TableModule],
})
export class AppModule {}
