import { JwtService } from '@nestjs/jwt'
import { OwnerService } from '../owner/owner.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Twilio } from 'twilio'
import { ManagerService } from '../manager/manager.service'
import { ConfigService } from 'src/config/config.service'

@Injectable()
export class AuthService {
  private twilioClient: Twilio
  constructor(
    private ownerService: OwnerService,
    private managerService: ManagerService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    const accountSid = this.configService.getTwilio().accountSid
    const authToken = this.configService.getTwilio().authToken

    this.twilioClient = new Twilio(accountSid, authToken)
  }

  public async checkOwnerOtp(phoneNumber: string, otp: string): Promise<string> {
    await this.ownerService.getOwner(phoneNumber)
    const serviceSid = this.configService.getTwilio().serviceSid

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
    const serviceSid = this.configService.getTwilio().serviceSid

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
