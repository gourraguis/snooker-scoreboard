import { Socket } from 'socket.io-client'
import { IBoard } from '../../../types/board'
import { IGame } from '../../../types/game'
import { IInitBoard } from '../../../types/initBoard'

export interface ServerToClientEvents {
  addBoard: (board: IBoard) => void
  removeBoard: (board: IBoard) => void
  updateGame: (game: IGame) => void
}

export interface ClientToServerEvents {
  initGame: (board: IInitBoard, cb: (game: IGame) => void) => void
  updatePlayerName: (board: IInitBoard) => void
  getBoardsData: (managerId: string | null) => void
  stopTimer: (board: IInitBoard) => void
}

export type ManagerSocket = Socket<ServerToClientEvents, ClientToServerEvents>
