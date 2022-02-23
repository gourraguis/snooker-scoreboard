import { Controller, Post, Body, BadRequestException, Get, Put, UseGuards, Query } from '@nestjs/common'
import { ConfigService } from '../../config/config.service'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { SmsService } from '../sms/sms.service'
import { Owner } from './entities/owner.entity'
import { OwnerService } from './owner.service'
import { validatePhoneNumber } from './utils'

@Controller('owner')
export class OwnerController {
  constructor(
    private configService: ConfigService,
    private readonly ownerService: OwnerService,
    private readonly smsService: SmsService
  ) {}

  @Put('otp')
  async generateOtp(@Query('phoneNumber') phoneNumber: string) {
    const owner = await this.ownerService.generateOtp(phoneNumber)
    if (owner) this.smsService.sendSms(owner.otp)
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getCurrentOwner(@AuthenticatedUser() owner: Owner) {
    return owner
  }

  @Post()
  createOwner(@Body('owner') owner: Partial<Owner>, @Body('secret') secret: string) {
    validatePhoneNumber(owner.phoneNumber)
    if (!owner.name) {
      throw new BadRequestException("Please provide the owner's name")
    }
    if (secret !== this.configService.getCreateOwnerSecret()) {
      throw new BadRequestException('invalid create owner secret')
    }

    return this.ownerService.createOwner(owner)
  }
}
