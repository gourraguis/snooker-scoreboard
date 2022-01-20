import { Server, Socket } from 'socket.io'
import { IBoard } from './board'

interface ServerToClientEvents {
  newGame: () => void
}

interface ClientToServerEvents {
  updateBoard: (board: IBoard) => void
}

interface SocketData {
  boardId: string
}

export type BoardClientToServerEvents = keyof ClientToServerEvents

export type BoardServer = Server<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>

export type BoardSocket = Socket<ServerToClientEvents, ClientToServerEvents>
