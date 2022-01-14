import { Server, Socket } from 'socket.io'
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { ClientToServerEvents, ServerToClientEvents, SocketData } from './common/types/sockets'
import { IBoard } from './common/types/Board'
import * as moment from 'moment'

@WebSocketGateway({ cors: true, namespace: 'manager' })
export class BoardGateway {
  @WebSocketServer()
  server: Server<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>

  @SubscribeMessage('fetchBoardsList')
  fetchBoardsList(): void {
    const boards: IBoard[] = [
      {
        tableName: 'Table 1',
        startedAt: moment().toDate(),
        players: [
          {
            color: 'text-red-800',
            turn: 0,
            name: 'Harvey',
            points: 44,
          },
          {
            color: 'text-blue-800',
            turn: 1,
            name: 'Mike Ross',
            points: 30,
          },
        ],
      },
      {
        tableName: 'Table 2',
        startedAt: moment().toDate(),
        players: [
          {
            color: 'text-red-800',
            turn: 0,
            name: 'Toto',
            points: 54,
          },
          {
            color: 'text-blue-800',
            turn: 1,
            name: '7liwa',
            points: 36,
          },
        ],
      },
    ]

    this.server.emit('fetchBoardsList', boards)
  }

  @SubscribeMessage('startNewGame')
  startNewGame(): void {
    console.log('Game has been started')
    this.server.emit('startNewGame', true)
  }
}
