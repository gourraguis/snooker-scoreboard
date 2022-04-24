import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Between, Repository } from 'typeorm'
import { IInitBoard } from '../types/initBoard'
import { Game } from './entities/game.entity'
import { IGame } from './types/game'
import { IStatsFilter } from './types/stats-filter'
import { Board } from '../board/entities/board.entity'

@Injectable()
export class GameService {
  private logger: Logger = new Logger(GameService.name)

  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  public async getManagerStats(id: string, filter: IStatsFilter) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {
      managerId: id,
    }
    if (filter.boardId) {
      query.boardId = filter.boardId
    }
    if (filter.startDate) {
      query.startedAt = Between(filter.startDate, new Date())
    }
    if (filter.finishDate) {
      query.finishedAt = Between(filter.finishDate, new Date())
    }
    const managerGames = await this.gameRepository.find({
      where: query,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {
      ownerId: id,
    }
    if (filter.managerId) {
      query.managerId = filter.managerId
    }
    if (filter.boardId) {
      query.boardId = filter.boardId
    }
    if (filter.startDate) {
      query.startedAt = Between(filter.startDate, new Date())
    }
    if (filter.finishDate) {
      query.finishedAt = Between(filter.finishDate, new Date())
    }
    const ownerGames = await this.gameRepository.find({
      where: query,
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

  public async saveGame(managerId: string, ownerId: string, game: Game): Promise<Game> {
    const newGame = new Game()
    newGame.boardId = game.boardId
    newGame.managerId = managerId
    newGame.ownerId = ownerId
    newGame.winner = game.winner
    newGame.loser = game.loser
    newGame.startedAt = game.startedAt
    newGame.finishedAt = game.finishedAt

    return this.gameRepository.save(newGame)
  }

  public async getGamesState(ownerId: string): Promise<IGame[]> {
    const managerBoards = await this.boardRepository.find({
      where: {
        ownerId,
      },
    })
    const gamesState = managerBoards.map((board) => this.cacheManager.get<IGame>(board.id))

    return (await Promise.all(gamesState)).filter((gameState) => !!gameState)
  }

  public async saveGameState(game: IGame): Promise<void> {
    const prevState = await this.cacheManager.get<IGame>(game.boardId)
    if (prevState?.updatedAt && moment(prevState?.updatedAt).isAfter(game.updatedAt)) {
      return
    }

    await this.cacheManager.set<IGame>(game.boardId, game)
  }
}
