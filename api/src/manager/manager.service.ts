import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
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

  async getManager(id: string): Promise<IManager> {
    const manager = await this.managerRepository.findOne({
      id: id,
    })
    if (!manager) {
      throw new NotFoundException('There is no manager with this phone number')
    }
    return {
      id: manager.id,
      name: manager.name,
      owner: manager.owner,
    }
  }

  async getManagersWithTheSameOwner(owner: string): Promise<IManager[]> {
    const managers = await this.managerRepository.find({ where: { owner: owner } })
    if (!managers) {
      throw new NotFoundException('There is no managers with this owner')
    }
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
