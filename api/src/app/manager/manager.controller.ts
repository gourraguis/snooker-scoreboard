import { Controller, Post, Body, Get, BadRequestException, Param, Delete, UseGuards, Put, Query } from '@nestjs/common'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { validatePhoneNumber } from '../owner/utils'
import { TwilioService } from '../twilio/twilio.service'
import { Manager } from './entities/manager.entity'
import { ManagerService } from './manager.service'
import { IManager } from './types'

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService, private readonly smsService: TwilioService) {}

  @Put('otp')
  async checkPhoneNumber(@Query('phoneNumber') phoneNumber: string) {
    const manager = await this.managerService.getManager(phoneNumber)
    if (manager) this.smsService.sendOtp(phoneNumber)
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getManager(@AuthenticatedUser() { phoneNumber }: Manager) {
    return this.managerService.getManager(phoneNumber)
  }

  @Get()
  getManagers(): Promise<IManager[]> {
    return this.managerService.getManagers()
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getOwnerManagers(@AuthenticatedUser('phoneNumber') phoneNumber: string): Promise<IManager[]> {
    return this.managerService.getOwnerManagers(phoneNumber)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createManager(@AuthenticatedUser('phoneNumber') ownerId: string, @Body() manager: IManager): Promise<Manager> {
    validatePhoneNumber(manager.phoneNumber)
    if (!manager.name) {
      throw new BadRequestException("Please provide the manager's name")
    }
    return this.managerService.createManager(manager, ownerId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':phoneNumber')
  deleteManager(@Param('phoneNumber') phoneNumber: string) {
    return this.managerService.deleteManager(phoneNumber)
  }

  @UseGuards(JwtAuthGuard)
  @Get('statistics')
  getManagerStatistics(@AuthenticatedUser('phoneNumber') phoneNumber: string) {
    return this.managerService.getManagerStatistics(phoneNumber)
  }
}
