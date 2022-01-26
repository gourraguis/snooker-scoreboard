import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class OwnerService {
  private logger: Logger = new Logger(OwnerService.name)

  async create(name: string): Promise<void> {
    this.logger.log(JSON.stringify(name, null, 2))
  }
}
