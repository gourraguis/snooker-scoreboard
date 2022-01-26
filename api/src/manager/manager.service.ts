import { Injectable, Logger } from '@nestjs/common'
import { IManager } from './types'

@Injectable()
export class ManagerService {
  private logger: Logger = new Logger(ManagerService.name)

  async create(name: IManager): Promise<void> {
    this.logger.log(JSON.stringify(name, null, 2))
  }
}
