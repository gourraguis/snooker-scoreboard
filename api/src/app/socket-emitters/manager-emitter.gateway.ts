import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { IBoard } from '../board/types/board'
import { IGame } from '../game/types/game'
import { ManagerServer } from '../types/manager-sockets'

@WebSocketGateway({ cors: true, namespace: 'manager' })
export class ManagerEmmiterGateway {
  @WebSocketServer()
  server: ManagerServer

  public emitAddBoard(board: IBoard) {
    this.server.emit('addBoard', board)
  }

  public emitRemoveBoard(board: IBoard) {
    this.server.emit('removeBoard', board)
  }

  public emitUpdateGame(game: IGame) {
    this.server.emit('updateGame', game)
  }
}
