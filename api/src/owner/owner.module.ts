import { forwardRef, Module } from '@nestjs/common'
import { AppModule } from 'src/app.module'
import { OwnerController } from './owner.controller'
import { OwnerService } from './owner.service'

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
