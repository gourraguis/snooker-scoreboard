import { Server, Socket } from 'socket.io'
import { IBoard } from '../board/types/board'
import { IInitBoard } from './initBoard'

export interface ServerToClientEvents {
  initGame: (newGame: IGame) => void
  updatePlayerName: (game: IGame) => void
  getBoardsData: (boardId: string) => void
  endGame: () => void
}

export interface ClientToServerEvents {
  initBoard: (board: IInitBoard, cb: (board: IBoard) => void) => void
  updateGame: (game: IGame) => void
}

interface SocketData {
  boardId: string
}

export type BoardClientToServerEvents = keyof ClientToServerEvents

export type BoardServer = Server<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>

export type BoardSocket = Socket<ServerToClientEvents, ClientToServerEvents>
