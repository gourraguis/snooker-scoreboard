import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Board } from '../board/entities/board.entity'
import { IGame } from '../game/types/game'
import { ManagerServer } from '../types/manager-sockets'

@WebSocketGateway({ cors: true, namespace: 'manager' })
export class ManagerEmmiterGateway {
  @WebSocketServer()
  server: ManagerServer

  public emitAddBoard(board: Board) {
    this.server.emit('addBoard', board)
  }

  public emitRemoveBoard(board: Board) {
    this.server.emit('removeBoard', board)
  }

  public emitUpdateGame(game: IGame) {
    this.server.emit('updateGame', game)
  }
}
