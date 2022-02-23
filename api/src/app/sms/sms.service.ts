import { Injectable } from '@nestjs/common'

@Injectable()
export class SmsService {
  public async sendSms(otp: string) {
    console.log('Send SMS:', otp)
  }
}
