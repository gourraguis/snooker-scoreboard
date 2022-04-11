import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Owner } from '../owner/entities/owner.entity'
import { TwilioModule } from '../twilio/twilio.module'
import { Manager } from './entities/manager.entity'
import { ManagerController } from './manager.controller'
import { ManagerService } from './manager.service'

@Module({
  imports: [TypeOrmModule.forFeature([Manager, Owner]), TwilioModule],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
