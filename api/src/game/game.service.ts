import { Injectable, Logger } from '@nestjs/common'
import * as moment from 'moment'
import { IInitBoard } from 'src/types/initBoard'
import { IGame } from './types/game'

@Injectable()
export class GameService {
  private logger: Logger = new Logger(GameService.name)

  createGame(board: IInitBoard): IGame {
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
}
