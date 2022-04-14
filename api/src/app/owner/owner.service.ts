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

  public async getStatisticsByFilter(phoneNumber: string, filter) {
    // todo: refactor this very unclean code
    let games = []
    if (filter.managerId && filter.boardId) {
      games = await this.ownerRepository.query(
        `SELECT * FROM game WHERE game.owner_id = '${phoneNumber}' 
       And game.manager_id = '${filter.managerId}'
       And game.board_id = '${filter.boardId}'
       And game.started_at BETWEEN '${filter.startDate}' And '${filter.endDate}'`
      )
    } else if (!filter.managerId && filter.boardId) {
      games = await this.ownerRepository.query(
        `SELECT * FROM game WHERE game.owner_id = '${phoneNumber}' 
       And game.board_id = '${filter.boardId}'
       And game.started_at BETWEEN '${filter.startDate}' And '${filter.endDate}'`
      )
    } else if (filter.managerId && !filter.boardId) {
      games = await this.ownerRepository.query(
        `SELECT * FROM game WHERE game.owner_id = '${phoneNumber}'
       And game.manager_id = '${filter.managerId}'
       And game.started_at BETWEEN '${filter.startDate}' And '${filter.endDate}'`
      )
    } else if (!filter.managerId && !filter.boardId) {
      games = await this.ownerRepository.query(
        `SELECT * FROM game WHERE game.owner_id = '${phoneNumber}' 
       And game.started_at BETWEEN '${filter.startDate}' And '${filter.endDate}'`
      )
    }
    let data = []
    for (let index = 0; index < games.length; index++) {
      const table = await this.ownerRepository.query(`SELECT * FROM board WHERE board.id = '${games[index].board_id}'`)
      const manager = await this.ownerRepository.query(
        `SELECT * FROM manager WHERE manager.phone_number = '${games[index].manager_id}'`
      )

      data = [
        ...data,
        {
          manager: manager[0]?.name,
          table: table[0]?.name,
          startedAt: games[index].started_at,
          finishedAt: games[index].finished_at,
          winner: games[index].winner,
          loser: games[index].loser,
          duration: moment(moment(games[index].finished_at).diff(moment(games[index].started_at))).format('mm:ss'),
        },
      ]
    }
    return data
  }
}
