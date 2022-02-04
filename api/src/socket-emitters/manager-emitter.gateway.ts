import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { IGame } from 'src/game/types/game'
import { IBoard } from '../board/types/board'
import { ManagerServer } from '../types/manager-sockets'

@WebSocketGateway({ cors: true, namespace: 'manager' })
export class ManagerEmmiterGateway {
  @WebSocketServer()
  server: ManagerServer

  emitAddBoard(board: IBoard) {
    this.server.emit('addBoard', board)
  }

  emitRemoveBoard(board: IBoard) {
    this.server.emit('removeBoard', board)
  }

  emitUpdateGame(game: IGame) {
    this.server.emit('updateGame', game)
  }
}
