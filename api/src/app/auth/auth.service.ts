import { JwtService } from '@nestjs/jwt'
import { OwnerService } from '../owner/owner.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ManagerService } from '../manager/manager.service'
import { ConfigService } from 'src/config/config.service'
import { TwilioService } from '../twilio/twilio.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly managerService: ManagerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly twilioService: TwilioService
  ) {}

  public async checkOwnerOtp(phoneNumber: string, otp: string): Promise<string> {
    await this.ownerService.getOwner(phoneNumber)

    const isValid = await this.twilioService.validateOtp(phoneNumber, otp)
    if (!isValid && otp !== this.configService.getGlobalOtp()) {
      throw new BadRequestException('OTP verification code is invalid')
    }

    return this.jwtService.signAsync({
      id: phoneNumber,
      type: 'owner',
    })
  }

  public async checkManagerOtp(phoneNumber: string, otp: string): Promise<string> {
    await this.managerService.getManager(phoneNumber)

    const isValid = await this.twilioService.validateOtp(phoneNumber, otp)
    if (!isValid && otp !== this.configService.getGlobalOtp()) {
      throw new BadRequestException('OTP verification code is invalid')
    }

    return this.jwtService.signAsync({
      id: phoneNumber,
      type: 'manager',
    })
  }
}
