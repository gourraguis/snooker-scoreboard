import { Server, Socket } from 'socket.io'
import { IBoard } from '../board/types/board'
import { IGame } from '../game/types/game'
import { IInitBoard } from './initBoard'

export interface ServerToClientEvents {
  addBoard: (board: IBoard) => void
  updateGame: (game: IGame) => void
}

export interface ClientToServerEvents {
  initGame: (board: IInitBoard, cb: (game: IGame) => void) => void
}

interface SocketData {
  managerId: string
}

export type ManagerClientToServerEvents = keyof ClientToServerEvents

export type ManagerServer = Server<ClientToServerEvents, ServerToClientEvents, unknown, SocketData>

export type ManagerSocket = Socket<ServerToClientEvents, ClientToServerEvents, unknown, SocketData>
