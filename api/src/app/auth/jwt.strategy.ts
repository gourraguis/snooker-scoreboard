import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { OwnerService } from '../owner/owner.service'
import { ConfigService } from '../../config/config.service'
import { Owner } from '../owner/entities/owner.entity'
import { ManagerService } from '../manager/manager.service'
import { IOwner } from '../owner/types/IOwner'
import { IManager } from '../manager/types'

interface Payload extends Owner {
  iat: number
  exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private ownerService: OwnerService,
    private managerService: ManagerService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtSecret(),
    })
  }

  public async validate(payload: Payload) {
    const { phoneNumber } = payload
    let owner: IOwner
    let manager: IManager
    try {
      owner = await this.ownerService.getOwner(phoneNumber)
    } catch {}
    try {
      manager = await this.managerService.getManager(phoneNumber)
    } catch {}
    if (!owner && !manager) {
      throw new UnauthorizedException()
    }
    if (owner) return owner
    if (manager) return manager
  }
}
