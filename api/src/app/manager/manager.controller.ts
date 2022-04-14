import { Controller, Post, Body, Get, BadRequestException, Param, Delete, UseGuards, Put, Query } from '@nestjs/common'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { validatePhoneNumber } from '../owner/utils'
import { TwilioService } from '../twilio/twilio.service'
import { Manager } from './entities/manager.entity'
import { ManagerService } from './manager.service'

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService, private readonly smsService: TwilioService) {}

  @Put('otp')
  async checkPhoneNumber(@Query('id') id: string) {
    const manager = await this.managerService.getManager(id)
    if (manager) this.smsService.sendOtp(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getManager(@AuthenticatedUser('id') id: string) {
    return this.managerService.getManager(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('statistics')
  getManagerStatistics(@AuthenticatedUser('id') id: string) {
    return this.managerService.getManagerStatistics(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createManager(@AuthenticatedUser('id') ownerId: string, @Body() manager: Manager): Promise<Manager> {
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
}
