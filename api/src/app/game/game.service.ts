import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Between, Repository } from 'typeorm'
import { Manager } from '../manager/entities/manager.entity'
import { IInitBoard } from '../types/initBoard'
import { Game } from './entities/game.entity'
import { IGame } from './types/game'
import { IStatsFilter } from './types/stats-filter'

@Injectable()
export class GameService {
  private logger: Logger = new Logger(GameService.name)
  private lastDay = moment().startOf('day').toDate()
  private lastWeek = moment().startOf('week').toDate()

  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>
  ) {}

  public async getDailyGames(id: string) {
    const games = await this.gameRepository.find({
      where: {
        ownerId: id,
        startedAt: Between(this.lastDay, new Date()),
      },
    })
    if (!games) {
      throw new NotFoundException('There is no games this day')
    }
    return games.length
  }

  public async getWeeklyGames(id: string) {
    const games = await this.gameRepository.find({
      where: {
        ownerId: id,
        startedAt: Between(this.lastWeek, new Date()),
      },
    })
    if (!games) {
      throw new NotFoundException('There is no games this week')
    }
    return games.length
  }

  public async getManagerStats(id: string, filter: IStatsFilter) {
    const managerGames = await this.gameRepository.find({
      where: {
        managerId: id,
        boardId: filter.boardId,
        startedAt: filter.startDate && Between(filter.startDate, new Date()),
        finishedAt: filter.finishDate && Between(filter.finishDate, new Date()),
      },
      relations: ['board'],
    })

    return managerGames.map((game) => ({
      boardName: game.board.name,
      winner: game.winner,
      loser: game.loser,
      startedAt: game.startedAt,
      finishedAt: game.finishedAt,
    }))
  }

  public async getOwnerStats(id: string, filter: IStatsFilter) {
    const ownerGames = await this.gameRepository.find({
      where: {
        ownerId: id,
        managerId: filter.managerId,
        boardId: filter.boardId,
        startedAt: filter.startDate && Between(filter.startDate, new Date()),
        finishedAt: filter.finishDate && Between(filter.finishDate, new Date()),
      },
      relations: ['board', 'manager'],
    })

    return ownerGames.map((game) => ({
      managerName: game.manager.name,
      boardName: game.board.name,
      winner: game.winner,
      loser: game.loser,
      startedAt: game.startedAt,
      finishedAt: game.finishedAt,
    }))
  }

  public createGame(board: IInitBoard): IGame {
    this.logger.log(`Fetching board id: ${board.boardId} from db`)
    return {
      boardId: board.boardId,
      startedAt: moment().toDate(),
      finishedAt: null,
      history: [],
      players: [
        {
          turn: 0,
          name: board.firstPlayer || `Player 1`,
          score: 0,
        },
        {
          turn: 1,
          name: board.secondPlayer || `Player 2`,
          score: 0,
        },
      ],
    }
  }

  public async saveGame(managerId: string, game: Game): Promise<Game> {
    const { ownerId } = await this.managerRepository.findOne({
      where: {
        id: managerId,
      },
    })
    const newGame = new Game()
    newGame.boardId = game.boardId
    newGame.managerId = managerId
    newGame.ownerId = ownerId
    newGame.winner = game.winner
    newGame.loser = game.loser
    newGame.startedAt = game.startedAt
    newGame.finishedAt = game.finishedAt

    return this.gameRepository.save(game)
  }
}
