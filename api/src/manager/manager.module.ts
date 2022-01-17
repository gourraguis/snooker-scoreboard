import { Module } from '@nestjs/common'
import { ManagerGateway } from './manager.gateway'

@Module({
  providers: [ManagerGateway],
})
export class ManagerModule {}
