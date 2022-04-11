import { Controller, Post, Body, BadRequestException, Get, Put, UseGuards, Query } from '@nestjs/common'
import { ConfigService } from '../../config/config.service'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { TwilioService } from '../twilio/twilio.service'
import { Owner } from './entities/owner.entity'
import { OwnerService } from './owner.service'
import { validatePhoneNumber } from './utils'

@Controller('owner')
export class OwnerController {
  constructor(
    private configService: ConfigService,
    private readonly ownerService: OwnerService,
    private readonly smsService: TwilioService
  ) {}

  @Put('otp')
  async checkPhoneNumber(@Query('phoneNumber') phoneNumber: string) {
    const owner = await this.ownerService.getOwner(phoneNumber)
    if (owner) this.smsService.sendOtp(phoneNumber)
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getOwner(@AuthenticatedUser() { phoneNumber }: Owner) {
    return this.ownerService.getOwner(phoneNumber)
  }

  @Post('')
  createOwner(@Body('owner') owner: Partial<Owner>, @Body('secret') secret: string) {
    validatePhoneNumber(owner.phoneNumber)
    if (!owner.name) {
      throw new BadRequestException("Please provide the owner's name")
    }
    if (!owner.clubName) {
      throw new BadRequestException("Please provide the owner's club name")
    }
    if (!owner.address) {
      throw new BadRequestException("Please provide the club's address")
    }
    if (secret !== this.configService.getCreateOwnerSecret()) {
      throw new BadRequestException('invalid create owner secret')
    }

    return this.ownerService.createOwner(owner)
  }

  @Post('statistics')
  @UseGuards(JwtAuthGuard)
  getStatistics(@AuthenticatedUser('phoneNumber') phoneNumber: string, @Body() filter) {
    return this.ownerService.getStatisticsByFilter(phoneNumber, filter)
  }
}
