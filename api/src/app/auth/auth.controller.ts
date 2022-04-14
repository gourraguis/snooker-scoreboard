import { Controller, Get, Query } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('owner')
  loginOwner(@Query('id') id: string, @Query('otp') otp: string) {
    return this.authService.checkOwnerOtp(id, otp)
  }

  @Get('manager')
  loginManager(@Query('id') id: string, @Query('otp') otp: string) {
    return this.authService.checkManagerOtp(id, otp)
  }
}
