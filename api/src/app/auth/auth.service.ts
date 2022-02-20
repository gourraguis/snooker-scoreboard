import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { OwnerService } from '../owner/owner.service'
import { decodeOtp } from '../owner/utils'

@Injectable()
export class AuthService {
  constructor(private ownerService: OwnerService, private jwtService: JwtService) {}

  public async checkOtp(phoneNumber: string, otp: number) {
    const decodedOtp = decodeOtp(otp)
    const owner = await this.ownerService.findOwnerByCondition({
      phoneNumber,
      otp: decodedOtp,
    })
    if (!owner) {
      throw new NotFoundException('Otp is invalid !')
    }

    const access_token = await this.jwtService.signAsync({ phoneNumber: owner.phoneNumber, otp: owner.otp })

    const data = {
      accToken: access_token,
      phoneNumber: owner.phoneNumber,
      name: owner.name,
    }
    return data
  }
}
