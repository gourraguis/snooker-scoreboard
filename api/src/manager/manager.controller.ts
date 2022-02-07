import { Controller, Post, Body, Get, BadRequestException } from '@nestjs/common'
import { validatePhoneNumber } from 'src/owner/utils'
import { Manager } from './entities/manager.entity'
import { ManagerService } from './manager.service'
import { IManager } from './types'

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  getAllManagers(): Promise<IManager[]> {
    return this.managerService.getAllManagers()
  }

  @Post()
  createManager(@Body() manager: IManager): Promise<Manager> {
    validatePhoneNumber(manager.id)
    if (!manager.name) {
      throw new BadRequestException("Please provide the manager's name")
    }
    return this.managerService.createManager(manager)
  }
}
