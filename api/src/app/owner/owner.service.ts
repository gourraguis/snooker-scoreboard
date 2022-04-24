import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Between, Repository } from 'typeorm'
import { Board } from '../board/entities/board.entity'
import { Game } from '../game/entities/game.entity'
import { Manager } from '../manager/entities/manager.entity'
import { Owner } from './entities/owner.entity'

@Injectable()
export class OwnerService {
  private defaultBalance = 300
  private lastDay = moment().startOf('day').toDate()
  private lastWeek = moment().startOf('week').toDate()

  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>
  ) {}

  public async getOwner(id: string): Promise<Owner> {
    const owner = await this.ownerRepository.findOne({
      id,
    })
    if (!owner) {
      throw new BadRequestException(`Votre numéro de téléphone ou votre code d'authentification est invalide`)
    }

    return owner
  }

  public async getOwnerManagers(id: string) {
    const managers = await this.managerRepository.find({ where: { ownerId: id } })
    return Promise.all(
      managers.map(async (manager) => {
        const dailyGames = await this.gameRepository.count({
          where: {
            manager,
            startedAt: Between(this.lastDay, moment().toDate()),
          },
        })
        const weeklyGames = await this.gameRepository.count({
          where: {
            manager,
            startedAt: Between(this.lastWeek, moment().toDate()),
          },
        })

        return {
          ...manager,
          dailyGames,
          weeklyGames,
        }
      })
    )
  }

  public async getOwnerBoards(id: string) {
    const boards = await this.boardRepository.find({ where: { ownerId: id } })
    return Promise.all(
      boards.map(async (board) => {
        const dailyGames = await this.gameRepository.count({
          where: {
            board,
            startedAt: Between(this.lastDay, moment().toDate()),
          },
        })
        const weeklyGames = await this.gameRepository.count({
          where: {
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

  public async createOwner(owner: Partial<Owner>): Promise<Owner> {
    const existingOwner = await this.ownerRepository.findOne({
      id: owner.id,
    })
    if (existingOwner) {
      throw new ConflictException('An owner with this phone number already exists')
    }

    const newOwner = new Owner()
    newOwner.id = owner.id
    newOwner.fullName = owner.fullName
    newOwner.clubName = owner.clubName
    newOwner.address = owner.address
    newOwner.balance = this.defaultBalance
    await this.ownerRepository.save(newOwner)

    return newOwner
  }
}
