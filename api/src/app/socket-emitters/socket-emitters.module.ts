import { Module } from '@nestjs/common'
import { BoardModule } from '../board/board.module'
import { BoardEmitterGateway } from './board-emitter.gateway'
import { ManagerEmmiterGateway } from './manager-emitter.gateway'
@Module({
  imports: [BoardModule],
  providers: [BoardEmitterGateway, ManagerEmmiterGateway],
  exports: [BoardEmitterGateway, ManagerEmmiterGateway],
})
export class SocketEmittersModule {}
