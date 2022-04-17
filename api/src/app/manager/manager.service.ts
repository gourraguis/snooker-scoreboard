import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Between, Repository } from 'typeorm'
import { Board } from '../board/entities/board.entity'
import { Game } from '../game/entities/game.entity'
import { Manager } from './entities/manager.entity'

@Injectable()
export class ManagerService {
  private lastDay = moment().startOf('day').toDate()
  private lastWeek = moment().startOf('week').toDate()

  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>
  ) {}

  public async getManager(phoneNumber: string): Promise<Manager> {
    const manager = await this.managerRepository.findOne({
      where: {
        id: phoneNumber,
      },
      relations: ['owner'],
    })
    if (!manager) {
      throw new NotFoundException(`Manager with this phone number not found`)
    }

    return {
      ...manager,
    }
  }

  public async getManagerBoards(id: string) {
    const manager = await this.managerRepository.findOne({
      where: {
        id,
      },
    })
    const boards = await this.boardRepository.find({ where: { ownerId: manager?.ownerId } })

    return Promise.all(
      boards.map(async (board) => {
        const dailyGames = await this.gameRepository.count({
          where: {
            managerId: id,
            board,
            startedAt: Between(this.lastDay, moment().toDate()),
          },
        })
        const weeklyGames = await this.gameRepository.count({
          where: {
            managerId: id,
            board,
            startedAt: Between(this.lastWeek, moment().toDate()),
          },
        })

        return {
          ...board,
          dailyGames,
          weeklyGames,
        }
      })
    )
  }

  public async createManager(manager: Manager, ownerId: string): Promise<Manager> {
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
