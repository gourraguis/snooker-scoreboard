import { Module } from '@nestjs/common'
import { BoardEmitterGateway } from './board-emitter.gateway'
import { ManagerEmmiterGateway } from './manager-emitter.gateway'
@Module({
  providers: [BoardEmitterGateway, ManagerEmmiterGateway],
  exports: [BoardEmitterGateway, ManagerEmmiterGateway],
})
export class SocketEmittersModule {}
