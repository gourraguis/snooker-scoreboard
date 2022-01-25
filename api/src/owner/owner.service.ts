import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class OwnerService {
  private logger: Logger = new Logger(OwnerService.name)
  constructor(private readonly itemModel) {}

  async create(name: string): Promise<void> {
    const newName = new this.itemModel(name)
    return this.logger.log(`new name ${newName}`)
  }
}
