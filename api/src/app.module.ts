import { Module } from '@nestjs/common'
import { SocketEmittersModule } from './socket-emitters/socket-emitters.module'
import { SocketListenersModule } from './socket-listeners/socket-listeners.module'

@Module({
  imports: [SocketEmittersModule, SocketListenersModule],
})
export class AppModule {}
