import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { ManagerClientToServerEvents, ManagerServer, ManagerSocket } from 'src/types/manager-sockets'
import { BoardEmitterGateway } from 'src/socket-emitters/board-emitter.gateway'
import { ManagerEmmiterGateway } from 'src/socket-emitters/manager-emitter.gateway'

@WebSocketGateway({ cors: true, namespace: 'manager' })
export class ManagerListenerGateway implements OnGatewayConnection {
  private logger: Logger = new Logger(ManagerListenerGateway.name)
  @WebSocketServer()
  server: ManagerServer

  constructor(
    private readonly boardEmitterGateway: BoardEmitterGateway,
    private readonly managerEmitterGateway: ManagerEmmiterGateway
  ) {}

  handleConnection(ManagerClient: ManagerSocket) {
    this.logger.log(`NODE_ENV=${process.env.NODE_ENV}`)
    this.logger.log(`Manager connected: ${ManagerClient.id}`)
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
    this.logger.log(`Starting new game on board id: ${boardId}`)
    this.boardEmitterGateway.emitStartNewGame()
    return { error: null }
  }
}
