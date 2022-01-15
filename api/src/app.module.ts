import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppGateway } from './app.gateway'
import { AppService } from './app.service'
import { BoardModule } from './board/board.module'

@Module({
  imports: [BoardModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
