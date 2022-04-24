import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { BoardClientToServerEvents, BoardServer, BoardSocket } from '../types/board-sockets'
import { BoardEmitterGateway } from '../socket-emitters/board-emitter.gateway'
import { BoardService } from '../board/board.service'
import { Socket } from 'socket.io'
import { Board } from '../board/entities/board.entity'

@WebSocketGateway({ cors: true, namespace: 'board' })
export class BoardListenerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger(BoardEmitterGateway.name)
  @WebSocketServer()
  server: BoardServer

  constructor(private readonly boardService: BoardService) {}

  public async handleDisconnect(boardClient: BoardSocket) {
    if (!boardClient?.data?.boardId) {
      return
    }
    this.logger.log(`Board disconnected: ${boardClient.id}`)
  }

  public handleConnection(boardClient: BoardSocket) {
    this.logger.log(`Board connected: ${boardClient.id}`)
  }

  @SubscribeMessage<BoardClientToServerEvents>('initBoard')
  async onInitBoard(@MessageBody() boardId: string, @ConnectedSocket() client: Socket): Promise<void | Board> {
    if (!boardId) return
    client.data.boardId = boardId

    const board = await this.boardService.getBoardWithSocketId(boardId, client.id)
    return board
  }
}
