import { Injectable, Logger } from '@nestjs/common'
import { ITable } from './types'

@Injectable()
export class TableService {
  private logger: Logger = new Logger(TableService.name)

  async create(name: ITable): Promise<void> {
    this.logger.log(JSON.stringify(name, null, 2))
  }
}
