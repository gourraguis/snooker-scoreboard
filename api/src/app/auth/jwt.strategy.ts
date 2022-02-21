import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { OwnerService } from '../owner/owner.service'
import { ConfigService } from '../../config/config.service'
import { Owner } from '../owner/entities/owner.entity'

interface Payload extends Owner {
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
    console.log(payload)
    const { phoneNumber, otp } = payload
    const owner = await this.ownerService.getOwner(phoneNumber, otp)
    console.log(payload)

    if (!owner) {
      throw new UnauthorizedException()
    }
    return owner
  }
}
