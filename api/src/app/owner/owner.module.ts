import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import ConfigModule from '../../config/config.module'
import { TwilioModule } from '../twilio/twilio.module'
import { Owner } from './entities/owner.entity'
import { OwnerController } from './owner.controller'
import { OwnerService } from './owner.service'

@Module({
  imports: [TypeOrmModule.forFeature([Owner]), ConfigModule, TwilioModule],

  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
