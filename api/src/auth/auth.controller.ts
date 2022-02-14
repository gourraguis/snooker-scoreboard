import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { JwtService } from '@nestjs/jwt'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService) {}

  // todo use query ?param1=ddd&param2=ddd
  @Get('loginOtp/:otp')
  checkOtp(@Param('otp') otp: number) {
    return this.authService.checkOtp(otp)
  }
}
