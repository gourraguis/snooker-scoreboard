import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Between, Repository } from 'typeorm'
import { Board } from '../board/entities/board.entity'
import { Manager } from '../manager/entities/manager.entity'
import { IInitBoard } from '../types/initBoard'
import { Game } from './entities/game.entity'
import { ICardElements } from './types/cardElement'
import { IGame } from './types/game'

@Injectable()
export class GameService {
  private logger: Logger = new Logger(GameService.name)
  private lastDay = moment().startOf('day').toDate()
  private lastWeek = moment().startOf('week').toDate()

  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>
  ) {}

  public createGame(board: IInitBoard): IGame {
    this.logger.log(`Fetching board id: ${board.boardId} from db`)
    return {
      id: board.boardId,
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

  public async saveGame(game: Game): Promise<Game> {
    return this.gameRepository.save(game)
  }

  public async getWeeklyGames(phoneNumber: string) {
    const games = await this.gameRepository.find({
      where: {
        ownerId: phoneNumber,
        startedAt: Between(this.lastWeek, new Date()),
      },
    })
    if (!games) {
      throw new NotFoundException('There is no games this week')
    }
    return games.length
  }

  public async getDailyGames(phoneNumber: string) {
    const games = await this.gameRepository.find({
      where: {
        ownerId: phoneNumber,
        startedAt: Between(this.lastDay, new Date()),
      },
    })
    if (!games) {
      throw new NotFoundException('There is no games this day')
    }
    return games.length
  }

  public async getManagerGames(phoneNumber: string) {
    const previousDay = new Date()
    previousDay.setDate(previousDay.getDate() - 1)

    const previousWeek = new Date()
    previousWeek.setDate(previousWeek.getDate() - 7)

    const manager = await this.managerRepository.findOne({
      where: {
        id: phoneNumber,
      },
    })

    const managerBoards = await this.boardRepository.find({
      where: {
        owner: manager.owner,
      },
    })

    return managerBoards.map((board) => {
      const dailyCount = this.gameRepository.count({
        where: {
          manager: manager.id,
          boardId: board.id,
          startedAt: Between(previousDay, new Date()),
        },
      })

      const weeklyCount = this.gameRepository.count({
        where: {
          manager: manager.id,
          boardId: board.id,
          startedAt: Between(previousWeek, new Date()),
        },
      })

      return {
        id: board.id,
        name: board.name,
        dailyCount,
        weeklyCount,
      }
    })
  }
}
