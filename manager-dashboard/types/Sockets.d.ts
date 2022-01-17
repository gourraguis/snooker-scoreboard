import { Socket } from 'socket.io-client'
import { IBoard } from './Board'

export interface ServerToClientEvents {
  boardsList: (boards: IBoard[]) => void
}

export interface ClientToServerEvents {
  newGame: (req: { boardId: string }, cb: (res: { error: string }) => void) => void
}

export type ManagerSocket = Socket<ServerToClientEvents, ClientToServerEvents>
