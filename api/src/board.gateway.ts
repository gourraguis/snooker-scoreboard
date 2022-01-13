import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'

@WebSocketGateway({ cors: true, namespace: 'board' })
export class BoardGateway {
  @WebSocketServer()
  server

  @SubscribeMessage('board')
  handleBoard(): void {
    const board = {
      tableName: 'Table 1',
      startedAt: `Thu Jan 13 2022 13:05:58 GMT+0100 (GMT+01:00)`,
      players: [
        {
          color: 'text-red-800',
          turn: 0,
          name: 'Harvey Specter',
        },
        {
          color: 'text-blue-800',
          turn: 1,
          name: 'Mike Ross',
        },
      ],
    }
    this.server.emit('board', board)
  }

  @SubscribeMessage('newGame')
  startNewGame(@MessageBody() body: string): void {
    console.log('Game has been started')

    this.server.emit('newGame', 'Game has been started')
  }
}
