import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Owner } from './entities/owner.entity'
import { OwnerController } from './owner.controller'
import { OwnerService } from './owner.service'

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],

  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
