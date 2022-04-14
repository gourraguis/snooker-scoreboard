import { BadRequestException, ConflictException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { DeleteResult, Repository } from 'typeorm'
import { Manager } from './entities/manager.entity'

@Injectable()
export class ManagerService {
  private logger: Logger = new Logger(ManagerService.name)

  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>
  ) {}

  public async getManager(phoneNumber: string): Promise<Manager> {
    const manager = await this.managerRepository.findOne({
      where: {
        id: phoneNumber,
      },
      relations: ['owner'],
    })
    if (!manager) {
      throw new BadRequestException(`Votre numéro de téléphone ou votre code d'authentification est invalide`)
    }

    return {
      ...manager,
    }
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

  public async createManager(manager: Manager, ownerId: string): Promise<Manager> {
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
    newManager.ownerId = ownerId
    return this.managerRepository.save(newManager)
  }

  public async deleteManager(id: string) {
    return await this.managerRepository.delete({ id })
  }
}
