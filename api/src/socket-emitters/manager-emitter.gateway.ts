import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { IBoard } from '../types/board'
import { ManagerServer } from '../types/manager-sockets'

@WebSocketGateway({ cors: true, namespace: 'manager' })
export class ManagerEmmiterGateway {
  @WebSocketServer()
  server: ManagerServer

  emitBoardsList(boardsList: IBoard[]) {
    this.server.emit('boardsList', boardsList)
  }

  emitUpdateBoard(board: IBoard) {
    this.server.emit('updateBoard', board)
  }
}
