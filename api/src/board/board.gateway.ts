import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { ServerToClientEvents, ManagerServer, ManagerSocket } from '../types/Sockets'
import { Logger } from '@nestjs/common'

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

  @SubscribeMessage<keyof ServerToClientEvents>('startNewGame')
  onStartNewGame() {
    console.log(`starting new game on board toto`)
    this.server.emit('startNewGame')
    return { error: null }
  }
}
