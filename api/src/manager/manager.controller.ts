import { Controller, Post, Body } from '@nestjs/common'
import { ManagerService } from './manager.service'
import { IManager } from './types'

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('/addManager')
  create(@Body() name: IManager): Promise<void> {
    return this.managerService.create(name)
  }
}
