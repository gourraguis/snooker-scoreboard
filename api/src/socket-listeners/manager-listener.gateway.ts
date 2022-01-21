import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import * as moment from 'moment'
import { Logger } from '@nestjs/common'
import { ManagerClientToServerEvents, ManagerServer, ManagerSocket } from 'src/types/manager-sockets'
import { BoardEmitterGateway } from 'src/socket-emitters/board-emitter.gateway'
import { IBoard } from 'src/types/board'
import { ManagerEmmiterGateway } from 'src/socket-emitters/manager-emitter.gateway'

const boards: IBoard[] = [
  {
    id: '1',
    name: 'Table 1',
    startedAt: moment().toDate(),
    playersScore: [0, 0],
    history: [],
    players: [
      {
        color: 'text-red-800',
        turn: 0,
        name: 'Harvey',
      },
      {
        color: 'text-blue-800',
        turn: 1,
        name: 'Mike Ross',
      },
    ],
  },
  {
    id: '2',
    name: 'Table 2',
    startedAt: moment().toDate(),
    playersScore: [0, 0],
    history: [],
    players: [
      {
        color: 'text-red-800',
        turn: 0,
        name: 'Toto',
      },
      {
        color: 'text-blue-800',
        turn: 1,
        name: '7liwa',
      },
    ],
  },
]

@WebSocketGateway({ cors: true, namespace: 'manager' })
export class ManagerListenerGateway implements OnGatewayConnection {
  private logger: Logger = new Logger(ManagerListenerGateway.name)
  @WebSocketServer()
  server: ManagerServer

  constructor(
    private readonly boardEmitterGateway: BoardEmitterGateway,
    private readonly managerEmitterGateway: ManagerEmmiterGateway
  ) {}

  handleConnection(client: ManagerSocket) {
    this.logger.log(`Client connected: ${client.id}`)
    this.managerEmitterGateway.emitBoardsList(boards)
  }

  @SubscribeMessage<ManagerClientToServerEvents>('newGame')
  onNewGame(@MessageBody('boardId') boardId: string, @ConnectedSocket() client: ManagerSocket) {
    // const managerId = client.data.managerId
    const managerId = '1'
    if (!managerId) {
      //todo: redirect to login in case of error
      return
    }
    //todo: use board id to start game on the right board
    this.boardEmitterGateway.emitStartNewGame()
    return { error: null }
  }
}
