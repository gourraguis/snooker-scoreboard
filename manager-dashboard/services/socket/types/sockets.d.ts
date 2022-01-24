import { Socket } from 'socket.io-client'
import { IBoard } from '../../../types/board'

export interface ServerToClientEvents {
  newBoard: (board: IBoard) => void
  updateBoard: (board: IBoard) => void
}

export interface ClientToServerEvents {
  newGame: (req: { boardId: string }, res: () => void) => void
}

export type ManagerSocket = Socket<ServerToClientEvents, ClientToServerEvents>
