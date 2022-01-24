import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { BoardServer } from '../types/board-sockets'

@WebSocketGateway({ cors: true, namespace: 'board' })
export class BoardEmitterGateway {
  @WebSocketServer()
  server: BoardServer

  emitStartNewGame() {
    this.server.emit('newGame')
  }
}
