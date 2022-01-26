import { Injectable, Logger } from '@nestjs/common'
import { IBoard } from './types/board'

@Injectable()
export class BoardService {
  private logger: Logger = new Logger(BoardService.name)

  findBoard(boardId: string): IBoard {
    this.logger.log(`Fetching board id: ${boardId} from db`)
    return {
      id: boardId,
      name: `Table ${boardId}`,
    }
  }
}
