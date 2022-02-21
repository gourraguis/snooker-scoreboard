import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { IGame } from '../game/types/game'
import { BoardServer } from '../types/board-sockets'

@WebSocketGateway({ cors: true, namespace: 'board' })
export class BoardEmitterGateway {
  @WebSocketServer()
  server: BoardServer

  public emitStartNewGame(newGame: IGame) {
    this.server.emit('initGame', newGame)
  }
}
