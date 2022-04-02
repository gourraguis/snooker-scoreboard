import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { DeleteResult, Repository } from 'typeorm'
import { Manager } from './entities/manager.entity'
import { IManager } from './types'

@Injectable()
export class ManagerService {
  private logger: Logger = new Logger(ManagerService.name)

  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>
  ) {}

  public async checkPhoneNumber(phoneNumber: string): Promise<Manager> {
    const manager = await this.managerRepository.findOne({
      id: phoneNumber,
    })
    if (!manager) {
      throw new NotFoundException('There is no manager with this phone number')
    }
    return manager
  }

  public async getManager(phoneNumber: string): Promise<IManager> {
    const manager = await this.managerRepository.findOne({
      id: phoneNumber,
    })
    if (!manager) {
      throw new BadRequestException(`Votre numéro de téléphone ou votre code d'authentification est invalide`)
    }

    return {
      id: manager.id,
      name: manager.name,
      owner: manager.owner,
    }
  }

  public async getManagers(): Promise<IManager[]> {
    const managers = await this.managerRepository.find()
    return managers
  }

  public async getManagerById(id: string): Promise<IManager> {
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

  public async getOwnerManagers(phoneNumber: string): Promise<IManager[]> {
    const managers = await this.managerRepository.find({ where: { owner: phoneNumber } })
    if (!managers) {
      throw new NotFoundException('There is no managers with this owner')
    }
    return managers
  }

  public async createManager(manager: IManager, ownerId: string): Promise<Manager> {
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
    newManager.owner = ownerId
    return this.managerRepository.save(newManager)
  }

  public async deleteManager(id: string): Promise<DeleteResult> {
    return await this.managerRepository.delete({ id: id })
  }

  public async getManagerStatistics(phoneNumber: string) {
    let games = []
    games = await this.managerRepository.query(`SELECT * FROM game WHERE game.manager_id = '${phoneNumber}' LIMIT 30`)

    let data = []
    for (let index = 0; index < games.length; index++) {
      const table = await this.managerRepository.query(
        `SELECT * FROM board WHERE board.id = '${games[index].board_id}'`
      )

      data = [
        ...data,
        {
          table: table[0]?.name,
          winner: games[index].winner,
          loser: games[index].loser,
          startedAt: moment(games[index].started_at).format('MM-DD HH:mm'),
        },
      ]
    }
    return data
  }
}
