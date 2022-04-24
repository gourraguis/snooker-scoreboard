import { Module } from '@nestjs/common'
import { BoardModule } from '../board/board.module'
import { BoardEmitterGateway } from './board-emitter.gateway'
@Module({
  imports: [BoardModule],
  providers: [BoardEmitterGateway],
  exports: [BoardEmitterGateway],
})
export class SocketEmittersModule {}
