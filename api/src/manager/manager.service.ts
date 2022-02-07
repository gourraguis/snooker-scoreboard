import { ConflictException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Manager } from './entities/manager.entity'
import { IManager } from './types'

@Injectable()
export class ManagerService {
  private logger: Logger = new Logger(ManagerService.name)

  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>
  ) {}

  async getAllManagers(): Promise<IManager[]> {
    const managers = await this.managerRepository.find()
    return managers
  }

  async createManager(manager: IManager): Promise<Manager> {
    this.logger.log(JSON.stringify(manager, null, 2))
    const existingManager = await this.managerRepository.findOne({
      id: manager.id,
    })
    if (existingManager) {
      throw new ConflictException('An manager with this phone number already exists')
    }

    const newManager = new Manager()
    newManager.id = manager.id
    newManager.name = manager.name
    newManager.owner = manager.owner
    return this.managerRepository.save(newManager)
  }
}
