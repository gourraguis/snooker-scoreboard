import { Server, Socket } from 'socket.io'
import { IBoard } from '../board/types/board'

export interface ServerToClientEvents {
  initGame: (newGame: IGame) => void
}

export interface ClientToServerEvents {
  initBoard: (boardId: string, cb: (board: IBoard) => void) => void
  updateGame: (game: IGame) => void
}

interface SocketData {
  boardId: string
}

export type BoardClientToServerEvents = keyof ClientToServerEvents

export type BoardServer = Server<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>

export type BoardSocket = Socket<ServerToClientEvents, ClientToServerEvents>
