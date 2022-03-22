import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Twilio } from 'twilio'

@Injectable()
export class SmsService {
  private twilioClient: Twilio

  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID')
    const authToken = configService.get('TWILIO_AUTH_TOKEN')

    this.twilioClient = new Twilio(accountSid, authToken)
  }

  public async sendSms(phoneNumber: string) {
    const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID')

    const firstChar = phoneNumber.substring(0)
    const newPhone: string = firstChar !== '+' ? '+212' + phoneNumber.substring(1) : phoneNumber

    this.twilioClient.verify
      .services(serviceSid)
      .verifications.create({ to: newPhone, channel: 'sms' })
      .catch((err) => console.log(err))
  }
}
