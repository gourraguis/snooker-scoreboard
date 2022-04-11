import { Module } from '@nestjs/common'
import { TwilioService } from './twilio.service'
import ConfigModule from 'src/config/config.module'

@Module({
  imports: [ConfigModule],
  providers: [TwilioService],
  exports: [TwilioService],
})
export class TwilioModule {}
