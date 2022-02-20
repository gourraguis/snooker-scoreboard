import { Controller, Post, Body, Get, BadRequestException, Param, Delete, UseGuards } from '@nestjs/common'
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

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  getManager(@Param('id') id: string) {
    validatePhoneNumber(id)
    return this.managerService.getManager(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/byOwner/:owner')
  getOwnerManagers(@Param('owner') owner: string): Promise<IManager[]> {
    validatePhoneNumber(owner)
    return this.managerService.getOwnerManagers(owner)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createManager(@Body() manager: IManager): Promise<Manager> {
    validatePhoneNumber(manager.id)
    if (!manager.name) {
      throw new BadRequestException("Please provide the manager's name")
    }
    return this.managerService.createManager(manager)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteManager(@Param('id') id: string) {
    return this.managerService.deleteManager(id)
  }
}
