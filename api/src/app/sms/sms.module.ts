import { Module } from '@nestjs/common'
import { SmsService } from './sms.service'
import { ConfigModule } from '@nestjs/config'
import * as Joi from '@hapi/joi'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
      }),
    }),
  ],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
