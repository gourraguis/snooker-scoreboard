import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Between, Repository } from 'typeorm'
import { IInitBoard } from '../types/initBoard'
import { Game } from './entities/game.entity'
import { IGame, IGameDB } from './types/game'

@Injectable()
export class GameService {
  private logger: Logger = new Logger(GameService.name)

  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>
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
          name: board.firstPlayer || `Harvey`,
          score: 0,
        },
        {
          turn: 1,
          name: board.secondPlayer || `Mike Ross`,
          score: 0,
        },
      ],
    }
  }

  public async saveGame(game: IGameDB): Promise<IGameDB> {
    console.log(game)
    return this.gameRepository.save(game)
  }

  public async getManagerGames(managerId) {
    return this.gameRepository.find({ managerId })
  }

  public async getBoardGames(boardId) {
    return this.gameRepository.find({ boardId })
  }

  public async getWeeklyGames(phoneNumber: string) {
    const date = new Date()
    date.setDate(date.getDate() - 7)

    const boards = await this.gameRepository.find({
      where: {
        ownerId: phoneNumber,
        startedAt: Between(date, new Date()),
      },
    })
    if (!boards) {
      throw new NotFoundException('There is no games this week')
    }
    console.log(boards)
    return boards
  }

  public async getMonthlyGames(phoneNumber: string) {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)

    const boards = await this.gameRepository.find({
      where: {
        ownerId: phoneNumber,
        startedAt: Between(date, new Date()),
      },
    })
    if (!boards) {
      throw new NotFoundException('There is no games this month')
    }
    console.log(boards)
    return boards
  }
}
