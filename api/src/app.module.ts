import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppGateway } from './app.gateway'
import { AppService } from './app.service'
import { BoardGateway } from './board.gateway'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppGateway, BoardGateway],
})
export class AppModule {}
