import { Controller, Get, Query } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('owner')
  loginOwner(@Query('phoneNumber') phoneNumber: string, @Query('otp') otp: string) {
    return this.authService.checkOtp(phoneNumber, otp)
  }
}
