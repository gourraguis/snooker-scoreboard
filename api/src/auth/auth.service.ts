import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { OwnerService } from 'src/owner/owner.service'
import { decodeOtp } from 'src/owner/utils'

@Injectable()
export class AuthService {
  constructor(private ownerService: OwnerService, private jwtService: JwtService) {}

  async checkOtp(otp: number) {
    const decodedOtp = decodeOtp(otp)
    const owner = await this.ownerService.findOwnerByCondition({
      otp: decodedOtp,
    })
    if (!owner) {
      throw new NotFoundException('Otp in invalid !')
    }

    const access_token = await this.jwtService.signAsync({ phone: owner.phoneNumber })
    console.log(access_token)

    const data = {
      accToken: access_token,
      phoneNumber: owner.phoneNumber,
      name: owner.name,
    }
    console.log(this.jwtService.decode(access_token))
    return data
  }
}
