import { Server, Socket } from 'socket.io'
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { ClientToServerEvents, ServerToClientEvents, SocketData } from './common/types/sockets'
import { Logger } from '@nestjs/common'

@WebSocketGateway({ cors: true, namespace: '/app' })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>
  private logger: Logger = new Logger('AppGateway')

  afterInit() {
    this.logger.log('Init')
  }

  handleConnection(client: Socket<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.logger.log(`received message: ${message}. Sending response!`)
    this.server.emit('message', `!!!${message}!!!`)
  }
}
