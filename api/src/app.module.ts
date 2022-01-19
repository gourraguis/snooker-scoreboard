import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BoardModule } from './board/board.module'
import { ManagerModule } from './manager/manager.module'

@Module({
  imports: [ManagerModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
