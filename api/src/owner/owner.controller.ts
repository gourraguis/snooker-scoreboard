import { Controller, Post, Body } from '@nestjs/common'
import { OwnerService } from './owner.service'

@Controller('owner')
export class OwnerController {
  constructor(private readonly itemsService: OwnerService) {}

  @Post()
  create(@Body() name: string): Promise<void> {
    return this.itemsService.create(name)
  }
}
