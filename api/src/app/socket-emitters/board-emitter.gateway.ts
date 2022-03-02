import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { BoardService } from '../board/board.service'
import { IGame } from '../game/types/game'
import { BoardServer } from '../types/board-sockets'
import { IInitBoard } from '../types/initBoard'

@WebSocketGateway({ cors: true, namespace: 'board' })
export class BoardEmitterGateway {
  @WebSocketServer()
  server: BoardServer

  constructor(private readonly boardService: BoardService) {}

  public async emitStartNewGame(newGame: IGame) {
    const board = await this.boardService.getBoard(newGame.id)
    this.server.to(board.socketId).emit('initGame', newGame)
  }

  public async emitUpdatePlayerName(updatedGame: IInitBoard) {
    const board = await this.boardService.getBoard(updatedGame.boardId)
    this.server.to(board.socketId).emit('updatePlayerName', updatedGame)
  }
}
