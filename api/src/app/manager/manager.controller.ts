import { Controller, Post, Body, Get, BadRequestException, Param, Delete, UseGuards, Put, Query } from '@nestjs/common'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { validatePhoneNumber } from '../owner/utils'
import { SmsService } from '../sms/sms.service'
import { Manager } from './entities/manager.entity'
import { ManagerService } from './manager.service'
import { IManager } from './types'

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService, private readonly smsService: SmsService) {}

  @Put('otp')
  async checkPhoneNumber(@Query('phoneNumber') phoneNumber: string) {
    const manager = await this.managerService.checkPhoneNumber(phoneNumber)
    if (manager) this.smsService.sendSms(phoneNumber)
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getCurrentManager(@AuthenticatedUser() manager: Manager) {
    return manager
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
    validatePhoneNumber(manager.id)
    if (!manager.name) {
      throw new BadRequestException("Please provide the manager's name")
    }
    return this.managerService.createManager(manager, ownerId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteManager(@Param('id') id: string) {
    return this.managerService.deleteManager(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('statistics')
  getManagerStatistics(@AuthenticatedUser('id') phoneNumber: string) {
    return this.managerService.getManagerStatistics(phoneNumber)
  }
}
