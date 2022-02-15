import { Controller, Post, Body, BadRequestException, Get, Param, Put, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Owner } from './entities/owner.entity'
import { OwnerService } from './owner.service'
import { IOwner } from './types/IOwner'
import { validatePhoneNumber } from './utils'

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':phoneNumber')
  getOwner(@Param('phoneNumber') phoneNumber: string) {
    validatePhoneNumber(phoneNumber)
    return this.ownerService.getOwner(phoneNumber)
  }

  @Get('login/:phoneNumber')
  loginOwner(@Param('phoneNumber') phoneNumber: string) {
    validatePhoneNumber(phoneNumber)
    return this.ownerService.generateOtp(phoneNumber)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllOwners(): Promise<IOwner[]> {
    return this.ownerService.getAllOwners()
  }

  @Post()
  createOwner(@Body() owner: IOwner): Promise<Owner> {
    validatePhoneNumber(owner.phoneNumber)
    if (!owner.name) {
      throw new BadRequestException("Please provide the owner's name")
    }
    return this.ownerService.createOwner(owner)
  }

  @Put('otp')
  generateOtp(@Body('phoneNumber') phoneNumber: string) {
    validatePhoneNumber(phoneNumber)
    return this.ownerService.generateOtp(phoneNumber)
  }
}
