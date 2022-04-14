import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Logger } from '@nestjs/common'
import { OwnerService } from '../owner/owner.service'
import { ConfigService } from '../../config/config.service'
import { ManagerService } from '../manager/manager.service'

interface Payload {
  id: string
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
    const { id, type } = payload
    try {
      if (type === 'owner') {
        return await this.ownerService.getOwner(id)
      }
      if (type === 'manager') {
        return await this.managerService.getManager(id)
      }
    } catch {
      this.logger.warn(`Received invalid JWT validation request for ${type} with number: ${id}`)
    }
  }
}
