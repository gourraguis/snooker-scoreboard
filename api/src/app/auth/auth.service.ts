import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ManagerService } from '../manager/manager.service'
import { OwnerService } from '../owner/owner.service'

@Injectable()
export class AuthService {
  constructor(
    private ownerService: OwnerService,
    private managerService: ManagerService,
    private jwtService: JwtService
  ) {}

  public async checkOwnerOtp(phoneNumber: string, otp: string): Promise<string> {
    await this.ownerService.getOwner(phoneNumber, otp)
    return this.jwtService.signAsync({
      phoneNumber,
      otp,
    })
  }

  public async checkManagerOtp(phoneNumber: string, otp: string): Promise<string> {
    await this.managerService.getTheManager(phoneNumber, otp)
    return this.jwtService.signAsync({
      phoneNumber,
      otp,
    })
  }
}
