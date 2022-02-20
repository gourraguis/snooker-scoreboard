import { Controller, Get, Query } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService) {}

  @Get('loginOtp')
  checkOtp(@Query() query) {
    return this.authService.checkOtp(query.phoneNumber, query.otp)
  }
}
