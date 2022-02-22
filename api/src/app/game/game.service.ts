import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Between, Repository } from 'typeorm'
import { IInitBoard } from '../types/initBoard'
import { Game } from './entities/game.entity'
import { ICardElements } from './types/cardElement'
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

  public async getBoardGames(boardId) {
    return this.gameRepository.find({ boardId })
  }

  public async getWeeklyGames(phoneNumber: string) {
    const date = new Date()
    date.setDate(date.getDate() - 7)

    const games = await this.gameRepository.find({
      where: {
        ownerId: phoneNumber,
        startedAt: Between(date, new Date()),
      },
    })
    if (!games) {
      throw new NotFoundException('There is no games this week')
    }
    return games.length
  }

  public async getDailyGames(phoneNumber: string) {
    const date = new Date()
    date.setDate(date.getDate() - 1)

    const games = await this.gameRepository.find({
      where: {
        ownerId: phoneNumber,
        startedAt: Between(date, new Date()),
      },
    })
    if (!games) {
      throw new NotFoundException('There is no games this day')
    }
    return games.length
  }

  public async getManagersGames(phoneNumber: string): Promise<ICardElements[]> {
    const dailDyate = new Date()
    dailDyate.setDate(dailDyate.getDate() - 1)

    const weeklyDate = new Date()
    weeklyDate.setDate(weeklyDate.getDate() - 7)

    const games = await this.gameRepository.query(`SELECT * FROM manager WHERE manager.owner = '${phoneNumber}'`)
    if (!games) {
      throw new NotFoundException('There is no games this day')
    }

    let data = []

    for (let index = 0; index < games.length; index++) {
      const day = await this.gameRepository.find({
        managerId: games[index].id,
        startedAt: Between(dailDyate, new Date()),
      })

      const week = await this.gameRepository.find({
        managerId: games[index].id,
        startedAt: Between(weeklyDate, new Date()),
      })

      data = [
        ...data,
        {
          id: games[index].id,
          name: games[index].name,
          dailyScore: day.length,
          weeklyScore: week.length,
        },
      ]
    }
    return data
  }
}
