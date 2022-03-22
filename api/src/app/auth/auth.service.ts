import { JwtService } from '@nestjs/jwt'
import { OwnerService } from '../owner/owner.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Twilio } from 'twilio'
import { ManagerService } from '../manager/manager.service'

@Injectable()
export class AuthService {
  private twilioClient: Twilio
  constructor(
    private ownerService: OwnerService,
    private managerService: ManagerService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID')
    const authToken = configService.get('TWILIO_AUTH_TOKEN')

    this.twilioClient = new Twilio(accountSid, authToken)
  }

  public async checkOwnerOtp(phoneNumber: string, otp: string): Promise<string> {
    await this.ownerService.getOwner(phoneNumber)
    const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID')

    const firstChar = phoneNumber.substring(0)
    const newPhone: string = firstChar !== '+' ? '+212' + phoneNumber.substring(1) : phoneNumber

    const result = await this.twilioClient.verify
      .services(serviceSid)
      .verificationChecks.create({ to: newPhone, code: otp })

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided')
    }
    return this.jwtService.signAsync({
      phoneNumber,
    })
  }

  public async checkManagerOtp(phoneNumber: string, otp: string): Promise<string> {
    await this.managerService.getTheManager(phoneNumber)
    const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID')

    const firstChar = phoneNumber.substring(0)
    const newPhone: string = firstChar !== '+' ? '+212' + phoneNumber.substring(1) : phoneNumber

    const result = await this.twilioClient.verify
      .services(serviceSid)
      .verificationChecks.create({ to: newPhone, code: otp })

    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided')
    }
    return this.jwtService.signAsync({
      phoneNumber,
    })
  }
}
