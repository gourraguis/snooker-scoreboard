import { Module } from '@nestjs/common'
import { ManagerGateway } from './manager.gateway'
import { BoardModule } from 'src/board/board.module'
@Module({
  imports: [BoardModule],
  providers: [ManagerGateway],
})
export class ManagerModule {}
