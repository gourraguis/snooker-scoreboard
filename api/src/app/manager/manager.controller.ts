import { Controller, Post, Body, Get, BadRequestException, Param, Delete, UseGuards } from '@nestjs/common'
import { AuthenticatedUser } from '../auth/authenticated-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { validatePhoneNumber } from '../owner/utils'
import { Manager } from './entities/manager.entity'
import { ManagerService } from './manager.service'
import { IManager } from './types'

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  getManagers(): Promise<IManager[]> {
    return this.managerService.getManagers()
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getOwnerManagers(@AuthenticatedUser('phoneNumber') phoneNumber: string): Promise<IManager[]> {
    return this.managerService.getOwnerManagers(phoneNumber)
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  getManager(@Param('id') id: string) {
    validatePhoneNumber(id)
    return this.managerService.getManager(id)
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
}
