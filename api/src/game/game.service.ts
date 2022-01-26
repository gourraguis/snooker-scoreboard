import { Injectable, Logger } from '@nestjs/common'
import * as moment from 'moment'
import { IGame } from './types/game'

@Injectable()
export class GameService {
  private logger: Logger = new Logger(GameService.name)

  createGame(gameId: string): IGame {
    this.logger.log(`Fetching board id: ${gameId} from db`)
    return {
      id: gameId,
      boardId: gameId,
      startedAt: moment().toDate(),
      finishedAt: null,
      history: [],
      players: [
        {
          turn: 0,
          name: `Harvey`,
          score: 0,
        },
        {
          turn: 1,
          name: `Mike Ross`,
          score: 0,
        },
      ],
    }
  }
}
