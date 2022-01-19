import { Module } from '@nestjs/common'
import { ManagerModule } from 'src/manager/manager.module'
import { BoardGateway } from './board.gateway'
@Module({
  imports: [ManagerModule],
  providers: [BoardGateway],
})
export class BoardModule {}
