import { Controller, Post, Body, BadRequestException, Get, Param, Put } from '@nestjs/common'
import { Owner } from './entities/owner.entity'
import { OwnerService } from './owner.service'
import { IOwner } from './types/IOwner'
import { validatePhoneNumber } from './utils'

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

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

  @Get('auth/checkAuth')
  checkAuth() {
    return this.ownerService.checkAuth()
  }

  @Get('loginOtp/:otp')
  checkOtp(@Param('otp') otp: number) {
    return this.ownerService.checkOtp(otp)
  }

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
