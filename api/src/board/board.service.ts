import { Injectable, Logger } from '@nestjs/common'
import * as moment from 'moment'
import { IBoard } from '../types/board'

@Injectable()
export class BoardService {
  private logger: Logger = new Logger(BoardService.name)

  getBoard(boardId: string): IBoard {
    this.logger.log(`Fetching board id: ${boardId} from db`)
    return {
      id: boardId,
      name: `Table ${boardId}`,
      startedAt: moment().toDate(),
      history: [],
      players: [
        {
          turn: 0,
          name: `Harvey`,
        },
        {
          turn: 1,
          name: `Mike Ross`,
        },
      ],
    }
  }
}
