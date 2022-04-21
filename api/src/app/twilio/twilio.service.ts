import { Injectable } from '@nestjs/common'
import { ConfigService } from 'src/config/config.service'
import { Twilio } from 'twilio'

@Injectable()
export class TwilioService {
  private twilioClient: Twilio

  constructor(private readonly configService: ConfigService) {
    const accountSid = this.configService.getTwilio().accountSid
    const authToken = this.configService.getTwilio().authToken

    this.twilioClient = new Twilio(accountSid, authToken)
  }

  public async sendOtp(phoneNumber: string) {
    const serviceSid = this.configService.getTwilio().serviceSid

    const firstChar = phoneNumber.substring(0)
    const newPhone: string = firstChar !== '+' ? '+212' + phoneNumber.substring(1) : phoneNumber

    try {
      this.twilioClient.verify.services(serviceSid).verifications.create({ to: newPhone, channel: 'sms' })
    } catch (error) {
      console.error(error)
    }
  }

  public async validateOtp(phoneNumber: string, otp: string) {
    const serviceSid = this.configService.getTwilio().serviceSid

    const firstChar = phoneNumber.substring(0)
    const newPhone: string = firstChar !== '+' ? '+212' + phoneNumber.substring(1) : phoneNumber

    const result = await this.twilioClient.verify
      .services(serviceSid)
      .verificationChecks.create({ to: newPhone, code: otp })

    return result.valid && result.status === 'approved'
  }
}
