import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { OwnerService } from '../owner/owner.service'

@Injectable()
export class AuthService {
  constructor(private ownerService: OwnerService, private jwtService: JwtService) {}

  public async checkOtp(phoneNumber: string, otp: string): Promise<string> {
    await this.ownerService.getOwner(phoneNumber, otp)
    return this.jwtService.signAsync({
      phoneNumber,
      otp,
    })
  }
}
