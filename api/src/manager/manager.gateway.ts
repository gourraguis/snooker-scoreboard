import * as moment from 'moment'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { ClientToServerEvents, ManagerServer, ManagerSocket } from './types/Sockets'
import { IBoard } from './types/Board'
import { Logger } from '@nestjs/common'

const boards: IBoard[] = [
  {
    id: '1',
    name: 'Table 1',
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
    id: '2',
    name: 'Table 2',
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

@WebSocketGateway({ cors: true, namespace: 'manager' })
export class ManagerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger(ManagerGateway.name)
  @WebSocketServer()
  server: ManagerServer

  afterInit() {
    this.logger.log('Manager gateway has initialized.')
  }

  handleConnection(client: ManagerSocket) {
    this.logger.log(`Client connected: ${client.id}`)
    this.emitBoardsList(boards)
  }

  handleDisconnect(client: ManagerSocket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage<keyof ClientToServerEvents>('newGame')
  onNewGame(@MessageBody('boardId') boardId: string, @ConnectedSocket() client: ManagerSocket) {
    const board = boards.find(({ id }) => id === boardId)
    console.log(`client id: ${client.id}`)
    console.log(`starting new game on board ${board.name}`)
    return { error: null }
  }

  emitBoardsList(boardsList: IBoard[]) {
    this.server.emit('boardsList', boardsList)
  }
}
