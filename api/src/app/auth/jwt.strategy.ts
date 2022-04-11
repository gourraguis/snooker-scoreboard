import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { OwnerService } from '../owner/owner.service'
import { ConfigService } from '../../config/config.service'
import { Owner } from '../owner/entities/owner.entity'
import { ManagerService } from '../manager/manager.service'
import { IOwner } from '../owner/types/IOwner'
import { IManager } from '../manager/types'

interface Payload {
  phoneNumber: string
  type: 'owner' | 'manager'
  iat: number
  exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger: Logger = new Logger(JwtStrategy.name)

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
    const { phoneNumber, type } = payload
    try {
      if (type === 'owner') {
        return await this.ownerService.getOwner(phoneNumber)
      }
      if (type === 'manager') {
        return await this.managerService.getManager(phoneNumber)
      }
    } catch {
      this.logger.warn(`Received invalid JWT validation request for ${type} with number: ${phoneNumber}`)
    }
  }
}
