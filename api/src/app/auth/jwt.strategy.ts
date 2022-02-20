import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { OwnerService } from '../owner/owner.service'
import { ConfigService } from '../../config/config.service'

interface Payload {
  phoneNumber: string
  otp: string
  iat: number
  exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private ownerService: OwnerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtSecret(),
    })
  }

  public async validate(payload: Payload) {
    const user = await this.ownerService.findOwnerByCondition({
      phoneNumber: payload.phoneNumber,
      otp: payload.otp,
    })

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
