import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ phoneNumber: 'phoneNumber' })
  }

  async validate(otp: number): Promise<any> {
    const user = await this.authService.checkOtp(otp)
    if (!user) {
      throw new HttpException(
        {
          errorStatus: HttpStatus.UNAUTHORIZED,
          errorMessage: 'Invalid',
        },
        HttpStatus.UNAUTHORIZED
      )
    }
    return user
  }
}
