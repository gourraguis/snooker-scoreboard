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
import { ClientToServerEvents, ManagerServer, ManagerSocket } from '../types/Sockets'
import { Logger } from '@nestjs/common'
import { IBoard } from 'src/types/Board'
import { ManagerGateway } from 'src/manager/manager.gateway'

@WebSocketGateway({ cors: true, namespace: 'board' })
export class BoardGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger(BoardGateway.name)
  @WebSocketServer()
  server: ManagerServer

  afterInit() {
    this.logger.log('Board gateway has initialized.')
  }

  handleConnection(client: ManagerSocket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: ManagerSocket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }
  onStartNewGame() {
    this.server.emit('newGame')
    return { error: null }
  }

  constructor(private readonly managerGateway: ManagerGateway) {}

  @SubscribeMessage<keyof ClientToServerEvents>('updateGame')
  onUpdateGame(@MessageBody() board: IBoard) {
    this.managerGateway.emitUpdateGame(board)
    console.log(board)
  }
}
