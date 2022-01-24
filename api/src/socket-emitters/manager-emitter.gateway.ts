import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { IBoard } from '../types/board'
import { ManagerServer } from '../types/manager-sockets'

@WebSocketGateway({ cors: true, namespace: 'manager' })
export class ManagerEmmiterGateway {
  @WebSocketServer()
  server: ManagerServer

  emitNewBoard(board: IBoard) {
    this.server.emit('newBoard', board)
  }

  emitUpdateBoard(board: IBoard) {
    this.server.emit('updateBoard', board)
  }
}
