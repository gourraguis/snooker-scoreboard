import { Controller, Post, Body } from '@nestjs/common'
import { OwnerService } from './owner.service'

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  create(@Body() name: string): Promise<void> {
    return this.ownerService.create(name)
  }
}
