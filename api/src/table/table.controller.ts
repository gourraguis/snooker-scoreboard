import { Controller, Post, Body } from '@nestjs/common'
import { TableService } from './table.service'
import { ITable } from './types'

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post('/addTable')
  create(@Body() name: ITable): Promise<void> {
    return this.tableService.create(name)
  }
}
